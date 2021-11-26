import reducer,{initialState} from './reducer';

describe('reducer', () => {
    it('Prueba estado inicial', ()=>{
        expect(reducer(initialState,{})).toEqual({videogamesOrigin:[],videogamesName:[],videogamesById:{}, videogames:[],gender:[],create_videogame:{}});
    })
})




