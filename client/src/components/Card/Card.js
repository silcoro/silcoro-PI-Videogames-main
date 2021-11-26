import React from "react";
import { Link } from "react-router-dom";
import './Card.css'
import image from '../../imagenes/carga.gif'
import vacio from '../../imagenes/No_gender_videogame.png'

export default function Card({ListVideogames}){//listgames props que viene de mi Home.

    // console.log(`ListVideogames`, ListVideogames)
    return(   
        
            ListVideogames==='vacio'
            ?<img src={vacio} alt="vacio" /> 
            :(ListVideogames.length
            ?(ListVideogames.map(e=>{
                return(
                    <div key={e.id} className="id_videogame">
                        <div className="titulo">
                            <Link className="xLink" to={`/videogames/details/${e.id}`} >
                                <h2>{e.name}</h2>
                            </Link>                          
                        </div>
                        <img className="imagen-card" src={e.image} alt={e.name} />
                        <div className="genders">
                            <p>🌀 Genders</p>
                            <div >{e.genders?.map((e,i)=><div key={i}>🔹 {e}</div>)}</div>
                        </div>
                        
                    </div>
                )
            }))
            :<img src={image} alt="imagen-carga" />)
    )
}