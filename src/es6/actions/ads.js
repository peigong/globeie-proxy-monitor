//import fetch from 'isomorphic-fetch';

export const FETCH_ADS = 'FETCH_ADS';

function requestAds(){
    return {
        type: FETCH_ADS
    };
}
function receiveAds(ads){
    return {
        type: FETCH_ADS,
        status: 'success',
        response: ads
    };
}
function failAds(err){
    return {
        type: FETCH_ADS,
        status: 'error',
        error: err.message
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
            let action = receiveAds(json);
            dispatch(action);
        })
        .catch(err => {
            dispatch(failAds(err));
        });
    };
};
