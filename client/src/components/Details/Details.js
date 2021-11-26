import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvideogamesById,unmountCharacterById } from "../../redux/action";
import './Details.css'


export default function Details({id}){

    const obj = useSelector(state => state.videogamesById);//traigo de mi store los datos de mi videomagesBYID
    const dispatch = useDispatch()
    // console.log(`obj`, obj)
    useEffect(() => {
        dispatch(getvideogamesById(id))//despacho mi accion con el alor de mi ID
        return ()=> {dispatch(unmountCharacterById())}// sirve para desmontar
    }, [dispatch,id])

    return(
        <div className="principal-details">
            {
                obj.length !==0 || obj.length !== undefined
                ?(<div className="caja_principal" key={obj.id}>
                    <div className="parrafo-details">
                        <p>{obj.descripcion}</p>
                    </div>
                   
                    <div className="imagen-nombre-details" >
                        
                        <img  className="imagen" src={obj.image} alt={obj.name} />
                        <h3 className="nombre">{obj.name}</h3>                 
                        <div className="caja-details-1">
                            <p className="fecha-details" >📅/ {obj.fecha_Lanzamiento} /</p>
                            <p className="titulo-details-1">🌀 Genders</p>
                            <p className="genders-details">{
                                obj.genders?.map((e,i)=> <div key={i}>{e.name}</div>)
                            }</p>
                            <p className="titulo-details-1">🎮 🕹️ Platforms 👾</p>
                            <p className="genders-details">{
                                obj.platforms?.map((e,i)=> <div key={i}>{e}</div>)
                            }</p>
                        </div>                        
                    </div>
                    <div className="nombre-rating" >
                    <p >Rating</p>
                    <h4 className="rating"> {obj.rating}</h4>   
                    </div>
                    
                   

                
                </div>)
                :<span>cargando detalles...</span>

            }
        </div>

    )
}