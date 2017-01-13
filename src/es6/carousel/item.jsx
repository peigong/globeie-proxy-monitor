import React, { PropTypes } from 'react';

const CarouselItemComponent = ({ src = '' }) => (
    <div>
        { src }
    </div>
);

CarouselItemComponent.propTypes = {
    src: PropTypes.string.isRequired
};

export default CarouselItemComponent;
