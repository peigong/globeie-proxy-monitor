import React, { PropTypes } from 'react';
import CarouselItemComponent from './carousel-item-component.jsx';

const CarouselComponent = ({ items = [] }) => {
    let counter = 0;
    let host = SERVER_HOST;
    return (
        <ul>
            { items.map(item => (<CarouselItemComponent key={ 'i_' + counter++ } src={ `http://${ host }/${ item }` } />)) }
        </ul>
    );
};

CarouselComponent.propTypes = {
};

export default CarouselComponent;
