import React, { PropTypes } from 'react';
import CarouselItemComponent from './carousel-item-component.jsx';

const CarouselComponent = ({ items }) => (
    <ul>
        { items.map(item => (<CarouselItemComponent src={ item } />)) }
    </ul>
);

CarouselComponent.propTypes = {
    // items: PropTypes.string.isRequired
};

export default CarouselComponent;
