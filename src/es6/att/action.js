export const ATTENDANCE_FETCH = 'ATTENDANCE_FETCH';

function requestAtt(){
    return {
        type: ATTENDANCE_FETCH
    };
}
export function receiveAtt(att){
    return {
        type: ATTENDANCE_FETCH,
        status: 'success',
        response: att
    };
}
function failHandler(err){
    return {
        type: ATTENDANCE_FETCH,
        status: 'error',
        error: err.message
    };
}

export function fetchAtt(device){
    return function(dispatch){
        dispatch(requestAtt());

        let host = SERVER_HOST;
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${ host }/att/proxy/fetch.php?device=${ device }`, options)
        .then(response => response.json())
        .then(json => {
            let action = receiveAtt(json);
            dispatch(action);
        })
        .catch(err => {
            dispatch(failHandler(err));
        });
    };
};
