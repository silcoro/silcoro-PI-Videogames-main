import  React, { useEffect, useState } from 'react'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux'
import { getGender, getvideogames } from '../../redux/action';
import Card from '../Card/Card';
import Order from '../Order/Order';
import Filters from '../Filter/Filters';

export default function Home(){

    const videogamesOrigin = useSelector(state => state.videogames)//onbetngo datos de mi store
    console.log(`videogamesOrigin`, videogamesOrigin)
    const dispatch = useDispatch()


    const numberPage =[];//se guardara una lista de mis paginas
    /*******************************paginate************************** */
    const [page, setPage] = useState(1);//creo un estado page 
    const videogamesXpage =14;// lista de videogames por pagina

    /**-----------inicio conteo paginas-------------------------- */
    //ceil me proporciona el dato de mayor valor.
    // paginas se obtiene de dividir la logitud de mi valor obtenido de mi store y mi lista por pagina
        let paginas = Math.ceil(videogamesOrigin.length/videogamesXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);//obtengo el numero de paginas
        }
        const indexUltimo = page*videogamesXpage;//obtengo mi ultimo index para mi slice
        const indexInicio = indexUltimo - videogamesXpage;// para el inicio de mi slice
        const slicevideogame = videogamesOrigin.slice(indexInicio, indexUltimo);//devuelve una copia de mi array con lo cual slicevideogame sera enviado a mi componente Card
        console.log(`slicevideogame`, slicevideogame)


    /**----------fin conteo paginas-------------------------*/

    function pagination(e){
        if (e.target.value==="next") {
            setPage(page+1)// aumenta en 1 mi page y se vera reflejado en mi setPage
        } else if(e.target.value==="inicio"){
            setPage(1)//me ubica en la primera pagina por el valor 1 que se le pasa al setPage
        }else if(e.target.value ==="final"){
            setPage(numberPage.length)// igualmente pero al final de la pagina mide la longitud de mis paginas
        }else {
            setPage(page-1)// desminuye en 1 mi page
        }
    }
    /****************************extra *********************/
  

    useEffect(() => {
        dispatch(getvideogames())// despacho mi accion getvideogames que me traira todos mi datos para mi pagina principal
        dispatch(getGender())// sirve para cargas mis genders en mi pagina principal
    }, [dispatch])

    return(
        <div  className="home-principal">
            <div  className="order-filter">
                {/* mi componente filter que me sirvira para filtrar mi API,BD y por genders */}
            <Filters/>
            {/* mi componente order me ordenara mis datos de mi videogames */}
            <Order/>
            </div>
            {/* en componente Card envia la propiedad de mi slicevideogame que es el valor obtenido para mi paginado */}
            <Card ListVideogames={slicevideogame}/>


        {/********* paginate*************************************************** */}       
        <div className="pagination-container" >
                <button onClick={pagination} value="inicio" >⏪</button>
                <button onClick={pagination} value="previous" disabled={page===1} >◀️</button>
                    {  
                        numberPage.map((pag,index)=>{
                            return(
                                <div
                                    key={index}
                                    onClick={()=> setPage(pag)}//establezco mi pagina el valor se obtiene de mi PAG 
                                    className={page === pag ?'active':''}
                                >
                                    {/* numero asignado despues de mapear */}
                                {pag}
                            </div>
                            )
                        })
                    }
                <button onClick={pagination} value="next" disabled={page===numberPage.length}>▶️</button>
                <button onClick={pagination} value="final" >⏩</button>
            </div>
{/* **********End Paginate*************************************** */}





        </div>
    )
}