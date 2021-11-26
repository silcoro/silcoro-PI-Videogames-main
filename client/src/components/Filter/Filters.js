import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { filterApi, filterBD, filter_gender} from "../../redux/action";
import './Filters.css';


export default function Filters(){

const genderfilter = useSelector(state => state.gender)// datos de mi store de mi gender.

const dispatch = useDispatch()
const history = useHistory()

function handleChangeGender(e){ //funcion que recibe cada cambio de mi select
    if (e.target.value) {//verifica siexiste el valor
        console.log(`object====>`, e.target.value)
        dispatch(filter_gender(e.target.value))//despacho mi accion filter:gender con el valor seleccionado
        history.push("/videogames")//agrego el nombre de la ruta donde se ubicara
    }    
}

function handleChangeApioBD(e){////recibe el valor de mi select
    // verifica si el valor coincide con cada condicion
    if (e.target.value==="api") {        
        dispatch(filterApi("api"))//despacho mi filter api
        history.push("/videogames")
    } else if(e.target.value==="bd"){
        dispatch(filterBD("bd"));//despacho mi filter de mi base creada
        history.push("/videogames")
    }else if(e.target.value==="All"){
        dispatch(filter_gender("All"))// despacho todos mi datos de la API y BD creada
        history.push("/videogames")
    }
}


    return(
        <div className="barra-principal-filter-order" >
            <div className="border-caja">
                    <p className="titulo-caja">Filter Api o BD</p>
                    <select className="select-home-APi-BD" defaultValue={'default'} onChange={handleChangeApioBD}>
                        <option value="All">All</option>
                        <option value="api">API</option>
                        <option value="bd" >BD</option>
                    </select>
                </div>
            <div className="border-caja" >
                <p className="titulo-caja">Filter x Gender</p>                
                <select className="select-home-actividad" defaultValue={'default'} onChange={handleChangeGender} >
                    <option value="All"  >All</option>
                    {   
                        genderfilter.map((e) => {//se mapea mi genders
                            return(
                                <option key={e.id} >{e.name}</option>
                            )
                        })
                        
                    }
                </select>                
            </div>
        </div>
    )
}