import React from 'react';
import Container from './Container.jsx';
import CatTranslator from './../lib/CatTranslator';

let petfinderData = require("json!./../cats.json");


export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            cats: []
        };

    }

    componentDidMount() {
        let cats = petfinderData.petfinder.pets.pet;
        this.setState({
            cats: cats
                    .filter( (cat) => cat.media && cat.media.photos )
                    .map( (cat) => CatTranslator.translateCat(cat) )
        });
    }

    render(){
        return <Container cats={this.state.cats} />
    }
}