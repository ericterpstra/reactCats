import React from 'react';
import CatThumbnail from './CatThumbnail';

const CATS_PER_PAGE = 60;

let ListView = React.createClass({

    getInitialState() {
       return {
           catName: '',
           page: this.props.page
       }
    },

    onThumbHover(cat) {
        this.setState({
            catName: cat.name
        })
    },

    onThumbOut() {
        this.setState({catName:''})
    },

    getCatsForGrid() {
        let first = ((this.state.page) * CATS_PER_PAGE) - CATS_PER_PAGE;
        var last = first + CATS_PER_PAGE;
        return this.props.cats.slice(first,last);
    },

    nextCats(e) {
        e.preventDefault();
        let currentPage = this.state.page;
        let nextPage = currentPage + 1;
        let numPages = Math.ceil(this.props.cats.length / CATS_PER_PAGE);

        nextPage = nextPage > numPages ? 1 : nextPage;

        this.setState({
            page: nextPage
        });
    },

    prevCats(e) {
        e.preventDefault();
        let currentPage = this.state.page;
        let nextPage = currentPage - 1;
        let numPages = Math.ceil(this.props.cats.length / CATS_PER_PAGE);

        nextPage = nextPage <= 0 ? numPages : nextPage;

        this.setState({
            page: nextPage
        });
    },

    onCatClick(catIndex) {
        let actualCatIndex = catIndex + ((this.state.page - 1) * CATS_PER_PAGE)
        this.props.onClickCat(actualCatIndex, this.state.page);
    },

    render() {
        let theCats = this.getCatsForGrid().map( (cat,i) =>(
            <CatThumbnail
                key={cat.id}
                cat={cat}
                onClick={this.onCatClick.bind(this,i)}
                onMouseEnter={this.onThumbHover.bind(this, cat)}
                onMouseLeave={this.onThumbOut}
            />
        ));

        return (
            <div className="listContainer">
                <div className="catGrid">
                    {theCats}
                </div>

                <div className="listButtons">
                    <a className="left" href="" onClick={this.prevCats}>&lt; More Cats</a>
                    <span className="catName">{this.state.catName}</span>
                    <a className="right" href="" onClick={this.nextCats}>More Cats &gt;</a>
                </div>
            </div>
        )
    }
});

export default ListView;