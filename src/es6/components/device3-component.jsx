import React, { Component } from 'react';
import Monitor from '../apps/monitor.jsx';
import CarouselComponent from './carousel-component.jsx';

const Device3Component = ({ images }) => (
    <div>
        <div>
            <CarouselComponent items={ images['1'] } />
        </div>
        <div>
            <Monitor device="3" />
        </div>
        <div>
            <CarouselComponent items={ images['2'] } />
            <CarouselComponent items={ images['3'] } />
        </div>
    </div>
);

export default Device3Component;
