import { ADS_FETCH } from './action.js';

export default function(state = {}, action){
    if(ADS_FETCH === action.type){
        if(action.response){
            state = action.response.images || {};
            return state;
        }
        if(action.error){
            throw new Error(action.error);
        }
    }
    return state;
};
