import images from './images.js';
import { reportError } from '../error/action.js';

export const ADS_FETCH = 'ADS_FETCH';

function requestAds(){
    return {
        type: ADS_FETCH
    };
}

export function receiveAds(ads){
    return {
        type: ADS_FETCH,
        status: 'success',
        response: ads
    };
}

function throwError(code){
    return (dispatch) => {
        dispatch(reportError(code));
        dispatch(receiveAds(images));

        setTimeout(() => {
            dispatch(fetchAds());
        }, 1e3);
    };
}

export function fetchAds(){
    return function(dispatch){
        dispatch(requestAds());

        let host = SERVER_HOST;
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        return fetch(`http://${ host }/att/ads/fetch.php`, options)
        .then(response => response.json())
        .then(json => {
            if(json.hasOwnProperty('error')){
                if(json['error']){
                    dispatch(throwError(json['error']));
                }else{
                    if(json.images.hasOwnProperty('1') && 
                        json.images.hasOwnProperty('2') && 
                        json.images.hasOwnProperty('3')) {
                        dispatch(receiveAds(json.images));
                    }else{
                        // 轮播广告服务器端没有检索到图片文件
                        dispatch(throwError('404'));
                    }
                }
            }else{ // 轮播广告服务器端数据不包含错误编码字段
                dispatch(throwError('403'));
            }
        })
        .catch(err => {
            // 轮播广告不明确的服务器异常
            dispatch(throwError('401'));
            // 轮播广告服务器端数据为空
            // dispatch(throwError('402'));
        });
    };
};
