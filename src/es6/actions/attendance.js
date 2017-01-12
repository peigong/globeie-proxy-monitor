export const ATTENDANCE_FETCH = 'ATTENDANCE_FETCH';

function requestAttendance(){
    return {
        type: ATTENDANCE_FETCH
    };
}
export function receiveAttendance(ads){
    return {
        type: ATTENDANCE_FETCH,
        status: 'success',
        response: ads
    };
}
function failHandler(err){
    return {
        type: ATTENDANCE_FETCH,
        status: 'error',
        error: err.message
    };
}

export function fetchAttendance(device){
    return function(dispatch){
        dispatch(requestAttendance());

        let host = SERVER_HOST;
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${ host }/att/proxy/fetch.php`, options)
        .then(response => response.json())
        .then(json => {
            let action = receiveAttendance(json);
            dispatch(action);
        })
        .catch(err => {
            dispatch(failHandler(err));
        });
    };
};
