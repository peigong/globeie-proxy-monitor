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
function failHandler(err){
    return {
        type: ADS_FETCH,
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
            dispatch(failHandler(err));
        });
    };
};
