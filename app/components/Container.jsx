import React from 'react';
import ListView from './ListView.jsx';
import DetailView from './DetailView.jsx';

export default class Container extends React.Component {

    constructor(props) {
        super(props);

        this.getListView = this.getListView.bind(this);

        this.state = {
            views: this.getListView(props.cats)
        }
    }

    getListView(cats, page) {
        let currentPage = page || 1;
        return <ListView cats={cats} page={currentPage} onClickCat={this.goToDetailView.bind(this)} />;
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            view: this.getListView(nextProps.cats)
        };
    }

    goToListView(page) {
        this.setState({
            view: this.getListView(this.props.cats, page)
        })
    }

    goToDetailView(catIndex, page) {
        this.setState({
            view: <DetailView cats={this.props.cats} catIndex={catIndex} page={page} onBackClick={this.goToListView.bind(this)} />
        })
    }

    render() {
        return (
            <div className="container group">

                <div className="headerMsg">
                    <p>There are currently {this.props.cats.length} cats available for adoption.</p>
                    <p className="subtext">Click on the pictures below to get more details for each cat!</p>
                </div>

                {this.state.view}
            </div>
        );
    };

};