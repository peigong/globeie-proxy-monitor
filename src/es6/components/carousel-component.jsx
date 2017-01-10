import React, { PropTypes } from 'react';
import CarouselItemComponent from './carousel-item-component.jsx';

const CarouselComponent = ({ items = [] }) => {
    let counter = 0;
    return (
        <ul>
            { items.map(item => (<CarouselItemComponent key={ 'i_' + counter++ } src={ item } />)) }
        </ul>
    );
};

CarouselComponent.propTypes = {
    // items: PropTypes.string.isRequired
};

export default CarouselComponent;
