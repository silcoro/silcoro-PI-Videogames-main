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


export const initialState = {
    videogamesOrigin:[],// estado que nunca se modificara
    videogames:[],//estado que cambiara
    gender:[],//estado de mi genders
    videogamesById:{},// estado para mi dato por ID
    videogamesName:[],//estado para mis datos por nombre
    create_videogame:{}// mi estado cuando creo un videogame
}

export default function reducer(state= initialState, action){
    if (action.type === GET_VIDEOGAMES) {
        return{
            ...state,
            videogamesOrigin:action.payload,
            videogames:action.payload
        }
    }

    if (action.type === SORT_ASC_VIDEOGAMES) {
        //sort ordena mi arreglo
        let sorted = state.videogames.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            return {
                ...state,
                videogames: sorted
            } 
    }
    
    if (action.type === SORT_DESC_VIDEOGAMES) {
        //sort ordena mi arreglo y devuelve mi arreglo nuevo sorted
        let sorted = state.videogames.sort((a,b)=> b.name.toLowerCase().localeCompare(a.name.toLowerCase()));    
        return{
            ...state,
            videogames: sorted
        }
    }
    
    if (action.type ===RATING_ASC_VIDEOGAMES) {
        //sort ordena mi arreglo y devuelve mi arreglo nuevo games
        let games = state.videogames.sort((a,b)=>(a.rating)-(b.rating))
        return {
            ...state,
            videogames:games
        }
    }
    
    if (action.type ===RATING_DESC_VIDEOGAMES) {
        //sort ordena mi arreglo y devuelve mi arreglo nuevo games
        let games = state.videogames.sort((a,b)=>(b.rating)-(a.rating))
        return {
            ...state,
            videogames:games
        }
    }

    if (action.type === GET_GENDER) {
        return {
            ...state,
            gender: action.payload
        }
    }

    if (action.type === FILTER_GENDER) {
        
        let filtergender = (action.payload==='All')?state.videogamesOrigin: state.videogamesOrigin.filter(e => e.genders.find(a=>a===action.payload))
        return{
            ...state,
            videogames:filtergender.length===0?'vacio':filtergender
        }
    }

    if(action.type===FILTER_API_VIDEOGAMES){
        //filtro mi array X / el number.isinteger verifica si mi primary key es un entero
        let x = state.videogamesOrigin.filter(e=> Number.isInteger(e.id))
        return {
            ...state,
            videogames: x
        }
    }

    if(action.type===FILTER_BD_VIDEOGAMES){
        //filtro mi array X / el number.isinteger verifica si mi primary key NO es un entero
        let x = state.videogamesOrigin.filter(e=> !Number.isInteger(e.id))
        return {
            ...state,
            videogames: x.length===0?'vacio':x
        }
    }
    
    if (action.type ===VIDEOGAMES_BY_ID) {
        return{
            ...state,
            videogamesById:action.payload
        }
    }

    if (action.type=== UNMOUNT_CHARACTER_BY_ID) {
        return{
            ...state,
            videogamesById:action.payload
        }
    }

    if (action.type === GET_VIDEOGAMES_NAME) {
        return {
            ...state,
            videogamesName: action.payload
        }
    }

    if (action.type ===CREATE_VIDEOGAME) {
        return{
            ...state,
            create_videogame:action.payload
        }
    }

    return state
}

