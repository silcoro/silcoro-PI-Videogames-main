import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideoGamesName, unmountCharacterById } from "../../redux/action";
import './Search.css';
import buscar2 from '../../imagenes/buscar-fondo.png'


export default function Seacrh(){
    const state = useSelector(state => state.videogamesName);
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    /*******************************paginate************************** */
    const [page, setPage] = useState(1);
    const videogameXpage =14;

    /**-----------inicio conteo paginas-------------------------- */
    const numberPage =[];
        let paginas = Math.ceil(state.length/videogameXpage);
        for (let i = 1; i <= paginas; i++) {
            numberPage.push(i);
        }
        const indexUltimo = page*videogameXpage;
        const indexInicio = indexUltimo - videogameXpage;
        const slicevideogame = state.slice(indexInicio, indexUltimo);
    /**----------fin conteo paginas-------------------------*/

    function pagination(e){
        if (e.target.value==="next") {
            setPage(page+1)
        } else if(e.target.value==="inicio"){
            setPage(1)
        }else if(e.target.value ==="final"){
            setPage(numberPage.length)
        }else {
            setPage(page-1)
        }
    }
    /****************************extra *********************/
    function handleChange(e){// el dato obtenido por cada cambio
        setInput(e.target.value)// el valor obtenido de value {input}
    }

    useEffect(() => {
        dispatch(getVideoGamesName(input))
        return ()=>{
            dispatch(unmountCharacterById())
        }
    }, [dispatch,input])


    return(
        <div className="search-principal" >
            <div className="input">
                <input                        
                    className="input-navbar"
                    type="search" 
                    placeholder="🔎 Ingrese Nombre del VideoGame Aqui!!"
                    autoComplete="off"
                    onChange={handleChange}
                    value={input}
                />
            </div >
            <div className="cartel">
                {   slicevideogame.length
                    ?(slicevideogame.map(e=>{
                        return(
                            <div key={e.id} className="id_videogames">
                                <div className="titulo">
                                    <Link className="xlink" to={`/videogames/details/${e.id}`} >
                                        <h2>{e.name}</h2>
                                    </Link>                                
                                </div>
                                <img className="imagen-card" src={e.image} alt={e.name} />
                                
                            </div>
                        )
                    })
                    )
                    :<img  src={buscar2} alt="input vacio" height="600px" className="bus" />
                }
            </div>


 {/********* paginate*************************************************** */}       
 <div className="pagination-container" >
                <button onClick={pagination} value="inicio" >⏪</button>
                <button onClick={pagination} value="previous" disabled={page===1} >◀️</button>
                    {  
                        numberPage.map((pag,index)=>{
                            return(
                                <div
                                    key={index}
                                    onClick={()=> setPage(pag)}
                                    className={page === pag ?'active':''}
                                >
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