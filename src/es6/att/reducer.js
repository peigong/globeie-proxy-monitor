import { ATTENDANCE_FETCH } from './action.js';

export default function(state = {}, action){
    if(ATTENDANCE_FETCH === action.type){
        if(action.response){
            let data = action.response;
            let name = data.name || '';
            let number = data.number || '';
            let datetime = data.time || '';
            let arr = datetime.split(' ');
            let time = arr.pop();
            let date = arr.pop();
            return { name, number, date, time };
        }else{
            return null;
        }
    }
    return state;
};
