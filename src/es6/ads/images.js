const numbers = [1, 2, 3]; 
const images = numbers.reduce((dict, number) => {
    dict[number] = numbers.map(no => {
        return `haixuan/default/${ number }/${ no }.jpg`;
    });
    return dict;
}, {});

export default images;
