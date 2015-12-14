import React from 'react';
import CrappyCarousel from './CrappyCarousel.jsx'

const DetailView = React.createClass({
    getInitialState() {
        return {
            cat: this.props.cats[this.props.catIndex],
            index: this.props.catIndex
        }
    },

    componentWillReceiveProps(nextProps) {
        this.state = {
            cat: nextProps.cats[nextProps.catIndex]
        };
    },

    onBackClick() {
        this.props.onBackClick(this.props.page);
    },

    nextCat(nextIndex) {
        let idx = this.state.index + nextIndex;
        if ( idx < 0 ) idx = (this.props.cats.length - 1);
        if ( idx >= this.props.cats.length ) idx = 0;

        this.setState({
            cat: this.props.cats[idx],
            index: idx
        });
    },

    render() {
        let cat = this.state.cat;

        return (
            <div className="catDetail">

                {/* Title */}
                <div className="detail-header group">
                    <div className="left">
                        <a href="#" className="btn" onClick={this.onBackClick}>&#8592; Back</a>
                    </div>
                    <div className="right">
                        <span className="catDetails">{cat.name}: {cat.size} {cat.age} {cat.breed}</span>
                    </div>
                </div>


                {/* Pics and Description */}
                <div className="catDetailPane group">
                    <div className="carousel-container">
                        <CrappyCarousel catPics={cat.pics} />
                    </div>

                    <div className="catDescription">
                        {cat.description}
                    </div>
                </div>

                {/* Nav buttons and more detail */}
                <div className="listButtons">
                    <a href="#" className="left" onClick={this.nextCat.bind(this,-1)}>&lt; Prev Cat</a>
                    <span className="catOptions">{cat.options}</span>
                    <a href="#" className="right" onClick={this.nextCat.bind(this,1)}>Next Cat &gt;</a>
                </div>

            </div>
        )
    }
});

export default DetailView;