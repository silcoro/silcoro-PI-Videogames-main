const { Videogame, Gender } = require('../db.js');
const  axios  = require('axios');
const { YOUR_API_KEY } = process.env;


async function preCharge(){//FX que me sirvira para obtener mis GEnders de la  API  y depues crearlo a traves de mi model GEnder

    try {
        //obtengo de mi servidor mis genders
        let api = (await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)).data.results;

        //obtengo un nuevo array con todos mis genders
        let apigender = api.map(g => {
            return{
                name: g.name
            }
        });
        // creo en mi tabla genders mi gender,
        Promise.all( apigender.map(e => Gender.findOrCreate({where: e})));

        return "Gender cargados existosamente"

    } catch (error) {
        console.log(`error`, error)
    }

}

async function getGender(req, res, next){//FX para obtener mis Genders

    try {
        let genderbd = await Gender.findAll({attributes:{exclude:["createdAt","updatedAt"]}})//obtengo mis atributos pero excluyo 2 a la vez
        // console.log(`genderbd`, genderbd)
        res.status(200).json(genderbd)
    } catch (error) {
        next(error)
    }

}



module.exports = {
    preCharge,
    getGender
}