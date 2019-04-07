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

    convertToCurrency(input) {
        let value = input.toString();
        value = value.replace(/([0-9]{2})$/g, ",$1");
        if( value.length > 6 )
            value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return value;
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
                                    <span>{ this.convertToCurrency(prod.base_price) }</span>
                                </div>
                                <span className="page__product--iten-pay">Comprar</span>
                            </div>
                            <div className="page__product--description">
                                <h3>Descrição do Produto</h3>
                                <pre>{ this.state.description.plain_text }</pre>
                            </div>
                        </div>
                    )}                    
                </main>                
            </div>            
        )
    }
}
