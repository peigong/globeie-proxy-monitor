import React, { Component } from 'react';
import CarouselComponent from '../carousel/items.jsx';

export default class Layout extends Component {
    componentWillMount(){
        let { onWillMount } = this.props;
        onWillMount();
    }
    render(){
        let { children, images } = this.props;
        return (
            <div>
                <div>
                    <CarouselComponent items={ images['1'] } />
                </div>
                { children }
                <div>
                    <CarouselComponent items={ images['2'] } />
                    <CarouselComponent items={ images['3'] } />
                </div>
            </div>
        );
    }
};
