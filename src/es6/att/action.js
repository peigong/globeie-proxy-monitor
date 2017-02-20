import { reportError } from '../error/action.js';

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

function throwError(code, device){
    return (dispatch) => {
        dispatch(reportError(code));
        return (dispatch) => {
            setTimeout(() => {
                dispatch(fetchAtt(device));
            }, 1e3);
        };
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
            if(json.hasOwnProperty('error')){
                if(json['error']){
                    dispatch(throwError(json['error']));
                }else{
                    dispatch(receiveAtt(json));
                }
            }else{ // 考勤代理服务器返回的数据不包含异常编码
                dispatch(throwError('302'));
            }
        })
        .catch(err => {
            // 考勤代理服务器连接异常
            dispatch(throwError('202', device));
            // 考勤代理服务器没有返回数据
            // dispatch(throwError('301', device));
        });
    };
};
