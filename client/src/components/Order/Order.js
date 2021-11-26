import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { sortAscVideoGames,sortDescVideoGames,ratingAscVideoGames,ratingDescVideoGames} from "../../redux/action";
import './Order.css';

export default function Order(){

    let dispatch = useDispatch()
    let history = useHistory()
    function handleChange(e){ //cada cambio que obtengo se mi select se despachara
        if (e.target.value==="asc") {
            dispatch(sortAscVideoGames("asc"))//despacha para que el videogame sea ascendente
            history.push("/videogames")
        } else if(e.target.value==="desc"){
            dispatch(sortDescVideoGames("desc"));//descendente
            history.push("/videogames")
        } else if(e.target.value==="rating"){
            dispatch(ratingAscVideoGames("rating"));//por rating ascendente
            history.push("/videogames")
        } else if(e.target.value==="ratingDesc"){
            dispatch(ratingDescVideoGames("ratingDesc"));//descendente
            history.push("/videogames")
        }
        // else if(e.target.value==="refrescar"){
        //     dispatch(getvideogames());
        //     history.push("/videogames")
        // }
    }

    return(
        <div className="border-caja">
            <p className="titulo-caja">Order Asc | Desc </p>
            <select className="select-home-order" defaultValue={'default'} onChange={e => handleChange(e)}>
                <option value="default" disabled> ↕️ Asc | Desc</option>
                {/* <option value="refrescar" >Refrescar</option> */}
                <option value="asc">Alfabetico A - Z 🔼</option>
                <option value="desc" >Alfabetico Z - A 🔽</option>
                <option value="rating" >Rating Asc ⬆️</option>
                <option value="ratingDesc" >Rating Desc ⬇️</option>
            </select>
        </div>
    )
}