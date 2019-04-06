import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Search.scss';
import Header from '../Header/Header';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            breadcrumb: [],
            loading: false, 
            error: false
        };
    }

    getData = (search) => {
        if (!search) {
            return this.setState({
                products: []
            });
        }

        this.setState({ loading: true, error: false, products: [] });

        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${ search }`)
        .then(response => response.json())
        .then(products => {
            this.setState ({
                breadcrumb: products,
                products: products.results,                
                loading: false
            });
        }).catch(e =>
            this.setState({ loading: false, error: true })
        );
    }

    componentDidMount() {
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.location.search);
        if(parsed.search !== undefined) {
            this.getData(parsed.search);
        }
    }

    componentWillReceiveProps() {
        const queryString = require('query-string');
        var parsed = queryString.parse(this.props.history.location.search);
        if(parsed.search !== undefined) {
            this.getData(parsed.search);
        }
    }

    replaceImg(src) {
        const img = src;
        return img.replace('-I.jpg','-X.jpg');
    }

    convertToCurrency(input) {
        let value = input.toString();
        value = value.replace(/([0-9]{2})$/g, ",$1");
        if( value.length > 6 )
            value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return value;
    }

    render() {
        return (            
            <div className="container">
                <Header  {...this.props} />
                <main role="main">
                    {
                        this.state.breadcrumb && this.state.breadcrumb.filters && (
                            <section className="breadcrumb">
                                <ul className="breadcrumb__itens">
                                    {
                                        this.state.breadcrumb.filters.map((item, i) => (
                                            <li key={ i }>
                                                { 
                                                    <span>
                                                    { item.values.map((val, i ) =>
                                                        <p key={ i }> {val.name}</p>
                                                    )}
                                                    </span>
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>                            
                        )
                    }

                    <section className="page__search content">
                        {
                            this.state.loading === true ? <div className="loading">Loading ... </div> : ''
                        }

                        {
                            this.state.error === true ? <div className="error">An error occured ... </div> : ''
                        }

                        {this.state.products && this.state.products.length > 0 && (
                           <ul className="page__search--products">
                               {
                                    this.state.products.map((item, i) => (
                                        <li className="products" key={ i }>
                                           
                                            <div className="products__item--image">
                                                <Link to={`/items/${item.id}`}>
                                                    <img src={this.replaceImg(item.thumbnail)} alt={item.title} title={item.title} />
                                                </Link>
                                            </div>
                                            <div className="products__item--info">
                                                <Link to={`/items/${item.id}`}>
                                                    <div className="products__item--info-price">
                                                        <span>R$ </span>
                                                        <span>{ this.convertToCurrency(item.price) }</span>
                                                        {
                                                            item.shipping.free_shipping === true ? 
                                                            <span className="products__item--info-shipping"></span> : ''
                                                        }
                                                    </div>
                                                    <h2 className="products__item--info-title">{item.title}</h2>
                                                </Link>
                                                <span className="products__item--info-city">{ item.address.city_name }</span>                                            
                                            </div>                                            
                                        </li>
                                    ))
                               }
                           </ul>
                        )}
                    </section>
                </main>
            </div>            
        )
    }
}
