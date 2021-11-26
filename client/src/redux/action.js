import {
GET_VIDEOGAMES,
SORT_ASC_VIDEOGAMES,
SORT_DESC_VIDEOGAMES,
RATING_ASC_VIDEOGAMES,
RATING_DESC_VIDEOGAMES,
GET_GENDER,
FILTER_GENDER,
FILTER_API_VIDEOGAMES,
FILTER_BD_VIDEOGAMES,
VIDEOGAMES_BY_ID,
UNMOUNT_CHARACTER_BY_ID,
GET_VIDEOGAMES_NAME,
CREATE_VIDEOGAME
} from './constants.js';

import axios from 'axios';

// obtengo mi  lista de mis videogames http://localhost:3001/videogames
export function getvideogames(){
    return dispatch => {
        axios.get(`http://localhost:3001/videogames`)
        .then((result) => {
            return dispatch({
                type:GET_VIDEOGAMES,
                payload:result.data
            })
        }).catch((err) => {
            console.log(`err`, err)
        });
    }
}

// devuele un accion para ordenar mi lista ascendentemente
export function sortAscVideoGames(order){
    return{
        type:SORT_ASC_VIDEOGAMES,
        payload:order
    }
}

// devuele un accion para ordenar mi decendentemente
export function sortDescVideoGames(order){
    return{
        type:SORT_DESC_VIDEOGAMES,
        payload:order
    }
}

// devuele un accion para ordenar mi lista por rating ascendentemete
export function ratingAscVideoGames(order){
    return{
        type:RATING_ASC_VIDEOGAMES,
        payload:order
    }
}

// devuele un accion para ordenar mi lista por rating descendentemete
export function ratingDescVideoGames(order){
    return{
        type:RATING_DESC_VIDEOGAMES,
        payload:order
    }
}

//obtengo mi lista de genders
export function getGender(){
    return dispatch => {
        axios.get(`http://localhost:3001/genres`)//hago mi peticion para obtener mis generos
        .then((result) => {
           return dispatch({
                    type:GET_GENDER,
                    payload:result.data
            })
        }).catch((err) => {
            console.log(`err`, err)
        });
    }
}
// recibe el valor que viene de mi option para asi poder filtrar por genders
export function filter_gender(gender_va){//gender_va el valor recibido
    return {
        type:FILTER_GENDER,
        payload:gender_va
    }
}

// recibe el valor que viene de mi option para asi poder filtrar por API
export function filterApi(api){//api el valor recibido
    return {        
            type:FILTER_API_VIDEOGAMES,
            payload: api        
    }
}

// recibe el valor que viene de mi option para asi poder filtrar BD
export function filterBD(bd){
    return {        
            type:FILTER_BD_VIDEOGAMES,
            payload: bd        
    }
}

// obtengo mi dato por ID
export function getvideogamesById(id){//id es la primary key que busco
    return dispatch => {
        axios.get(`http://localhost:3001/videogames/${id}`)//solicito mi dato pasando mi ID
        .then((result) => {
            return dispatch({
                type:VIDEOGAMES_BY_ID,
                payload:result.data
            })
        }).catch((err) => {
            console.log(`err`, err)
        });
    }
}

// sirve para desmontar el caracter o dato obtenido de mi ID
export function unmountCharacterById(){
    return {
                type:UNMOUNT_CHARACTER_BY_ID, 
                payload:{} // se le asigna on objeto vacio
            }    
}

// obtengo mi lista por el nombre ingresado
export function getVideoGamesName(name){
    let act = name?name:".";
    return dispatch=>{
        axios.get(`http://localhost:3001/videogames?name=${act}`)
        .then((result) => {
            return dispatch({
                type:GET_VIDEOGAMES_NAME,
                payload:result.data
            })
        }).catch((err) => {
            console.log(`err`, err)
        });
    }
}

// envio mi juego creado 
export function create_videogames(videogames){
    return dispatch => {
        axios.post(`http://localhost:3001/videogames`,videogames)//(url , videogames:data a enviar)
        .then((result) => {
            return dispatch({
                type:CREATE_VIDEOGAME,
                payload: result.data
            })
        }).catch((err) => {
            console.log(`err`, err)
        });
    }

}