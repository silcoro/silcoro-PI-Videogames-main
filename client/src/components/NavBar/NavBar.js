import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getvideogames } from "../../redux/action";
import './NavBar.css'
import logo from '../../imagenes/logo.png';

function NavBar(){

    const dispatch = useDispatch()

    function refresh(){
        dispatch(getvideogames())
    }

    return(
        <div>
            <header className="header-navbar">
                <div>                
                    <button className="logo-imagen" onClick={refresh} ><img src={logo} alt="logo" />inicio</button>
                </div>
                <nav  className="navbar">
                    <ul>
                        <li className='list-item' >
                            {/*  navlink me enviara al enlace asignado en mi TO */}
                            <div>
                                <NavLink className="navlink" exact to="/videogames" >
                                    Home
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="navlink" exact to="/videogames/search" >
                                    Buscar VideoGames
                                </NavLink>
                            </div>
                            <div>
                                <NavLink className="navlink" exact to="/videogames/create" >    
                                    Crear VideoGames
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
        )

}

export default NavBar;