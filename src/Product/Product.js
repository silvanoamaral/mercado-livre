import React, { Component } from 'react';

import './Product.scss';
import Header from '../Header/Header';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            description: []
        };
    }

    getDescription(id) {
        const endPointDescription = `https://api.mercadolibre.com/items/${ id }/description`;
        fetch(endPointDescription)
        .then(response => response.json())
        .then(data => {
            this.setState({ description: data });
        });
    }

    getData = (search) => {
        fetch(`https://api.mercadolibre.com/items/${ search }`)
        .then(response => response.json())
        .then(data => {
            this.setState({ product: data });
            this.getDescription(search);
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getData(params.productId);
    }

    render() {
        const prod = this.state.product;

        return (
            <div className="container">
                <Header  {...this.props} />
                <main role="main">                    
                    {this.state.product && prod !== '' && (
                        <div className="page__product content">
                            <div className="page__product--image">
                                <img src={ prod.pictures[0].url } alt={ prod.title } title={ prod.title } />
                            </div>
                            <div className="page__product--iten">
                                <p>{ prod.condition } - { prod.sold_quantity } vendidos</p>
                                <h2>{ prod.title }</h2>
                                <div className="price">
                                    <span>R$ </span>
                                    <span>{ prod.base_price }</span>
                                </div>
                            </div>
                            <div className="page__product--description">
                                <pre>{ this.state.description.plain_text }</pre>
                            </div>
                        </div>
                    )}                    
                </main>                
            </div>            
        )
    }
}
