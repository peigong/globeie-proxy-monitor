import React, { Component } from 'react';
import CarouselComponent from '../carousel/items.jsx';

export default class Layout extends Component {
    componentWillMount(){
        let { onWillMount } = this.props;
        onWillMount();
    }
    render(){
        let { children, ads } = this.props;
        return (
            <div>
                <div>
                    <CarouselComponent items={ ads['1'] } />
                </div>
                { children }
                <div>
                    <CarouselComponent items={ ads['2'] } />
                    <CarouselComponent items={ ads['3'] } />
                </div>
            </div>
        );
    }
};
