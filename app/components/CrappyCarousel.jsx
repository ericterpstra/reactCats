import React from 'react';

const CrappyCarousel = React.createClass({

    getInitialState() {
        return {
            currentPic: 0
        }
    },

    navClick(dir) {
        let nextPic = this.state.currentPic + dir;
        if (nextPic >= this.props.catPics.length) nextPic = 0;
        if (nextPic < 0) nextPic = this.props.catPics.length - 1;

        this.setState({
            currentPic: nextPic
        });
    },

    render() {
        return (
          <div className="crappy-carousel-container">
              <div onClick={this.navClick.bind(this,-1)} className="carousel-nav carousel-left">&#10094;</div>
              <img src={this.props.catPics[this.state.currentPic]}/>
              <div onClick={this.navClick.bind(this,1)} className="carousel-nav carousel-right">&#10095;</div>
          </div>
        );
    }
});

export default CrappyCarousel;