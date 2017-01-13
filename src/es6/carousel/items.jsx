import React, { PropTypes } from 'react';
import CarouselItem from './item.jsx';

const Carousel = ({ items = [] }) => {
    let counter = 0;
    let host = SERVER_HOST;
    return (
        <ul>
            { items.map(item => (<CarouselItem key={ 'i_' + counter++ } src={ `http://${ host }/${ item }` } />)) }
        </ul>
    );
};

Carousel.propTypes = {
};

export default Carousel;
