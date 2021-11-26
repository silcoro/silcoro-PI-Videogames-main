import React from "react";
import './LandingPage.css';
import imagen from '../../imagenes/landing.jpg';
import { NavLink } from "react-router-dom";


export default function LandingPage(){
    return(
        <div className="container-LandingPage">
            {/* imagen principal para mi landingpage */}
            <img
            className="principal"
            src={imagen}
            alt="pama_mundi_azul"
            
            />
            {/* me redirecciona mi enlace a /videogames por el boton PRESS START */}
            <NavLink to="/videogames" >
                <button className="button-landingPage">
                    PRESS START
                </button>
                <div className="mapagif">
                
                </div>
            </NavLink>
            
        </div>

    )
}