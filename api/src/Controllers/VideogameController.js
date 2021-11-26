const { Videogame, Gender } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
const { YOUR_API_KEY } = process.env;


function videogamesBD(){// FX trae mis datos de mi base de datos creada
    let BD = Videogame.findAll({
        include:{
            model:Gender//incluyo a mi model Gender 
        },
        attributes:{
            exclude:["createdAt","updatedAt"]//excluyo los atributos
        }
    })
    .then((result) => {
        return result // retorna mi promesa exitosamente
    }).catch((err) => {
        console.log(err)
    });
    return BD;
}


function videogamesName(name){//FX que obtengo mi dato por el nombre pasado por el parametro
   return Videogame.findAll({
        where:{
            name:{
                [Op.iLike]: `%${name}%` // me consulta si existe mi name
            }
        },
        include:[{
            model:Gender,
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        }]
    })
}

function videogamesById(id){// FX obtiene mi dato por ID
    return Videogame.findByPk(id,{include:Gender});
}


async function getvideogames(req, res, next){//obtengo mi lista de videogames
    try {   
        let {name} = req.query
        if (name) {// si existe el nombre trae una lista de videogame relacionado con el nombre
            let BDName =await videogamesName(name);//obtengo de mi FX creada 

            //obtengo de mi API
            let apiName = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`)).data.results

            apiName = apiName.map(e=> {//devuelvo un array con videogame expecifico
                return{
                    id: e.id,
                    name: e.name,
                    descripcion:e.description,
                    fecha_Lanzamiento: e.released,
                    rating: e.rating,
                    platforms:e.parent_platforms.flatMap(e => e.platform.slug),
                    image: e.background_image,
                    genders: e.genres.map(g => g)
                }
            })
            let total = BDName.concat(apiName)
            res.status(200).json(total)

        } else {// sino me trae todos mis videogames
            
        let BD = await videogamesBD();//todos mi videogames de mi base de datos creada

        let newBD = BD.map(e=> {//  creo un array con videogames expecificos
            return {
                id: e.id,
                name: e.name,
                image: e.image,
                rating: e.rating,
                genders: e.genders.map(g => g.name)

            }
        })


        /***********obtengo de mi Api */
        let api_1 = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)).data
        //obtengo mis primeros 20
        let api_1_1 = api_1.results

        let api_2 = (await axios.get(api_1.next)).data
        //obtengo mis otros sgtes 20
        let api_2_2 = api_2.results

        let api_3 = (await axios.get(api_2.next)).data
        //obtengo mis otros  sgtes 20
        let api_3_3 = api_3.results

        
        let api_4 = (await axios.get(api_3.next)).data
        //obtengo mis otros sgtes 20
        let api_4_4 = api_4.results

        //obtengo mis otros sgtes 20
        let api_5 = (await axios.get(api_4.next)).data.results

    let totalApi = api_1_1.concat(api_2_2.concat(api_3_3.concat(api_4_4.concat(api_5))))

        let apis = totalApi.map(e => {
            return{
                id: e.id,
                name: e.name,
                image: e.background_image,
                rating: e.rating,
                platforms:e.parent_platforms.flatMap(e => e.platform.slug),
                genders: e.genres.map(g => g.name)
            }
        })

        let total = newBD.concat(apis)// concateno mi BD creada y mi API
        res.status(200).json(total)
        }


    } catch (error) {
        next(error)
    }
}


async function videogamesId(req, res, next){//FX para obtener mi videogame por ID

    try {
        let { idVideoGames } = req.params;
        var totalId;
        if (idVideoGames.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {//comparo machea con UUID
            totalId = await videogamesById(idVideoGames);         
        } else { // sino se mi ID es un numero entero que match con la  API
            let apiId = (await axios.get(`https://api.rawg.io/api/games/${idVideoGames}?key=${YOUR_API_KEY}`)).data

            totalId = {
                    id: apiId.id,
                    name: apiId.name,
                    descripcion:apiId.description,
                    fecha_Lanzamiento: apiId.released,
                    rating: apiId.rating,
                    platforms:apiId.parent_platforms.flatMap(e => e.platform.slug),
                    image: apiId.background_image,
                    genders: apiId.genres.map(g => g)
                }
        }
        res.status(200).json(totalId)
    } catch (error) {
        next(error)
    }
}



async function postvideogames(req, res, next){// crea un videogame
    try {
        // datos traidos de mi formulario
        const { name, descripcion, fecha_Lanzamiento, rating, platforms, image, genders } = req.body;

        let [newVideogame, created] = await Videogame.findOrCreate({// me comprueba si existe o no mi videogame
            where:{name},
            defaults:{
                descripcion,
                fecha_Lanzamiento,
                rating,
                platforms,
                image
            }
        })

        for (const i of genders) {
            const gen = await Gender.findOne({
                where:{
                    name:i
                }
            })
            newVideogame.addGender(gen)
        }
        res.status(200).json({created:created,newVideogame})

    } catch (error) {
        next(error)
    }
}

module.exports={
    getvideogames,
    videogamesId,
    postvideogames
}