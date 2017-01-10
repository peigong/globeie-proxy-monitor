import { FETCH_ADS } from '../actions/ads.js';

export default function(state, action){
    if(FETCH_ADS === action.type){
        if(action.response){
            console.log(action.response);
        }
        if(action.error){
            console.log(action.error);
        }
    }
    return state;
};
