import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_videogames, getGender } from "../../redux/action";
import './CreateVideoGame.css';
import { useHistory } from "react-router";

export default function CreateVideoGame(){

const gender_game = useSelector(state => state.gender);//extraigo de mi store los datos de mi gender
const dispatch = useDispatch();
const history = useHistory()


const [values, setValues] = useState({//creo mi internamente mi variable values para almacenar mi estado de mi componente. 
    name:"",
    descripcion:"",
    fecha_Lanzamiento:"",
    rating:"",
    platforms:[],
    image:"",
    genders:[]
})

const handlePlatformsSelection = e => {//funcion para platforms
    if (values.platforms.includes(e.target.value)) {//verifica si el valor se encuentra me devuelve true si esta o false si no esta
        let platformSelectd = values.platforms.filter(p => p !== e.target.value)
        setValues({//filtra mi platforms diferentes al value
            ...values,
            platforms:platformSelectd // sera asignado a mi platforms que es un array 
        })
    } else {// en el caso de que no este incluido
        setValues({
            ...values,
            platforms:[...values.platforms,e.target.value]
        })
    }
}

const handleGenderSelection = e =>{// funcion para genders
    
    if (values.genders.includes(e.target.value)) {//verifica si el valor se encuentra me devuelve true si esta o false si no esta
        let gendersSelected = values.genders.filter(p => p !== e.target.value)//si esta incluido filtro mi genders diferentes al value
        setValues({
            ...values,
            genders:gendersSelected// mi valor filtrado se le asignara a mi value.gender que es un array
        })
    } else {// sino esta incluido se le agregara a mi genders
        setValues({
            ...values,
            genders:[...values.genders, e.target.value]
        })
    }
}


const handleOnChange = e =>{// funcion valores simples
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })

}


const onSubmit = e => {// funcion que enviara los datos de mi formulario 
    e.preventDefault()
    dispatch(create_videogames(values))//los valores seran eviados a traves de la accion  create_videogames
    history.push("/videogames")//histoy:navego en mi historial y el push agrego el nombre la ruta a donde se ubicara.
}



useEffect(() => {
    dispatch(getGender())// aqui despacho mi accion getGender al store para obtener mis gender_game
}, [dispatch])

 let plataformas = ["pc","xbox one","nintendo","playstation","mac","linux","android","ios","playstation 5","playstation 4","playstation 3","xbox 360","xbox series S/X","nintendo switch"]
return(
    <div   className="formulario-container">
        <form className="formulario-principal-container" onSubmit={onSubmit} >
            <div className="formulario-form-container">            
                <div className="Cabecera-form" >
                <div className="obligatorio"> * Obligatorio </div>
                    <div className="asterisco">Nombre<label> * </label></div>
                    <input
                    title="Ingrese un Nombre con un Maximo de 50 caracteres"
                    required
                    className="name-form"
                    placeholder="Nombre del Videogames"
                    type="text"
                    value={values.name}
                    onChange={handleOnChange}
                    name="name"
                    maxLength="50"
                    >
                    </input>
                    <div className="asterisco">Fecha de Lanzamiento<label> * </label></div>
                    <input
                    title="Ingrese Fecha"
                    required
                    className="fecha-lanzamiento-form"
                    type="date"
                    value={values.fecha_Lanzamiento}
                    onChange={handleOnChange}
                    name="fecha_Lanzamiento"
                    >
                    </input>
                    <div className="asterisco">Rating<label> * </label></div>
                    <input
                    title="Ejemplo 0.1, 1.2, 3, 3.8 ó 9.9"
                    required
                    className="rating-form"
                    placeholder="Rango de rating esta entre el N° 0 y 10"
                    type="number"
                    min="0"
                    max="10"
                    value={values.rating}
                    name="rating"
                    onChange={handleOnChange}
                    step=".01"
                    >
                    </input>
                    <div className="asterisco">Imagen<label> * </label></div>
                    <input
                    title="debe ingresar un link o la direccion de imagen"
                    required
                    className="image-form"
                    placeholder="https:// ... "
                    type="text"                    
                    value={values.image}
                    name="image"
                    onChange={handleOnChange}
                    >
                    </input>
                    <div className="asterisco">Descripción<label> * </label></div>
                    <textarea
                    required
                    className="descripcion-form"
                    placeholder="Descripcion"
                    rows="20"
                    cols="50"
                    value={values.descripcion}
                    name="descripcion"
                    onChange={handleOnChange}
                    maxlength="2000"
                    title="maximo 2000 caracteres"
                    >
                    </textarea>             
                </div>

                <div className="body-form">
                    {/* **** parte para el genero ****** */}
                    <div className="gender-body-form" >
                        <div className="asterisco">Gender<label> * </label></div>
                        <select
                        title="Minima 1 opcion, maxima 6 opciones"
                        required
                        multiple
                        className="gender-select-body"
                        value={values.genders}
                        onChange={handleGenderSelection}
                        name="genders"
                        >
                            {   values.genders.length<=7
                                ?gender_game.map(e=>{
                                    return(
                                        <option key={e.id} value={e.name} >{e.name}</option>
                                    )
                                })// si supera la longitud 7 se desabilita mi option
                                :(<option disabled></option>)
                            }
                        </select>
                        <p>Lista de Genders Agregados</p>
                        <label  className="cuadro-videogames-plataforms">
                            {   values.genders.length<=6
                                ?values.genders.map((g,i)=>(
                                    <div key={i}>{g}</div>
                                ))
                                :<p className="parrafo-genders-length" >
                                    Solo se Permiten Seleccionar de 1 a 6 Genders,
                                    Porfavor elimina tu ultima opcion Seleccionada
                                    para completar el max de Genders permitido. Al intenta superar el limite se bloquearan las opciones, en caso de bloquearse Refresca la pagina
                                </p>
                            }
                        </label>
                    </div>                                        
                    {/* ****parte para la plataforma*********** */}
                    <div className="platforms-body-form" >
                        <div className="asterisco">Plataformas<label> *</label></div>
                        <select
                        title="Minima 1 opcion, maxima 6 opciones"
                        required
                        multiple
                        className="platforms-select-body"
                        value={values.platforms}
                        onChange={handlePlatformsSelection}
                        name="platforms"
                        >
                            {   values.platforms.length<=7
                                ?plataformas.map(e=>{
                                    return(
                                        <option key={e.id} value={e} >{e}</option>
                                    )
                                })// si supera la longitud 7 se desabilita mi option
                                :(<option disabled></option>)
                            }
                        </select>
                        <p>Lista de Plataformas Agregadas</p>
                        <label className="cuadro-videogames-plataforms" >
                            {   values.platforms.length<=6
                                ?values.platforms.map((p,i)=>(
                                    <div key={i} >{p}</div>
                                ))
                                :<p className="parrafo-genders-length" >
                                Solo se Permiten Seleccionar de 1 a 6 Plataformas,
                                Porfavor elimina tu ultima opcion Seleccionada
                                para completar el max de Platforms permitido. Al intenta superar el limite se bloquearan las opciones, en caso de bloquearse Refresca la Pagina
                                </p>
                            }
                        </label>
                    </div>                    
                </div>
            </div>
            {   // boton se desabilitara si no cumple la condicion
                (values.platforms.length<=6 && values.genders.length<=6)
                ?<button type="submit" className="boton" >Guardar</button>
                :<button type="submit" className="boton" disabled >Guardar </button>
            }
            
        </form>
    </div>
)

}




