const numbers = ['1', '2', '3']; 
const images = numbers.reduce((number, dict) => {
    dict[number] = numbers.map(no => {
        let host = SERVER_HOST;
        return `http://${ host }/haixuan/default/${ number }/${ no }.jpg`;
    });
}, {});
export default images;
