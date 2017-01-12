import { ADS_FETCH } from '../actions/ads.js';

export default function(state = {}, action){
    if(ADS_FETCH === action.type){
        if(action.response){
            let images = action.response.images;
            if(images){
                return { images };
            }
        }
        if(action.error){
            throw new Error(action.error);
        }
    }
    return state;
};
