import { ADS_FETCH } from './action.js';

export default function(state = {}, action){
    if(ADS_FETCH === action.type){
        return Object.assign({}, action.response);
    }
    return state;
};
