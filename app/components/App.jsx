import React from 'react';
import Container from './Container.jsx';
import CatTranslator from './../lib/CatTranslator';
import reqwest from 'reqwest';


export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            cats: []
        };

    }

    componentDidMount() {
        reqwest({
            url: '/cats.json',
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                debugger;
                let cats = res.petfinder.pets.pet;
                this.setState({
                    cats: cats
                        .filter( (cat) => cat.media && cat.media.photos )
                        .map( (cat) => CatTranslator.translateCat(cat) )
                });
            }
        });
    }

    render(){
        return <Container cats={this.state.cats} />
    }
}