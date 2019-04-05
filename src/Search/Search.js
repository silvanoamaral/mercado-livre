import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Search.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [], 
            loading: false, 
            error: false
        };
    }

    getData = (search) => {
        console.log('Page search: ', search);
        if (!search) {
            return this.setState({
                products: []
            });
        }

        this.setState({ loading: true, error: false });

        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${ search }`)
        .then(response => response.json())
        .then(products => {
            //console.log(products.results);
            this.setState({ 
                products: products.results,
                loading: false
            });
            //this.props.history.push(`/items/search=${ search }`);
        }).catch(e => this.setState({ loading: false, error: true }));
    }

    componentDidMount() {
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        if(parsed.search !== undefined) {
            this.getData(parsed.search);
        }
    }

    render() {
        if (this.state.loading) {
            return <div className="loading">Loading ... </div>;
        }
        if (this.state.error) {
            return <div className="error">An error occured ... </div>;
        }

        return (
            <section className="page__search">
                {this.state.products && this.state.products.length > 0 && (
                    this.state.products.map((item, i) => (
                        <li key={ i }>
                            <Link to={`/items/${item.id}`}>{item.title}</Link>
                        </li>
                    ))
                )}
            </section>          
        )
    }
}
