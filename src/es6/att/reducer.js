import { ATTENDANCE_FETCH } from './action.js';

export default function(state = {}, action){
    if(ATTENDANCE_FETCH === action.type){
        let data = '', name = '', number = '', datetime = '', arr = [], time = '', date = '';
        if(action.response){
            data = action.response;
            name = data.name || '';
            number = data.number || '';
            datetime = data.time || '';
            arr = datetime.split(' ');
            time = arr.pop();
            date = arr.pop();
        }
        return { name, number, date, time };
    }
    return state;
};
