import { filter_gender } from './action.js'
import {FILTER_GENDER} from './constants'

describe('Action Creatos',()=>{
    it('Deberia existir mi action type:FILTER_GENDER y payload su valor lo recibe por argumento',()=>{
        expect(filter_gender('Action')).toEqual({
            type:FILTER_GENDER,
            payload:'Action'
        })
    })
})