import React, { Component } from 'react';

import './Product.scss';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }

    getData = (search) => {
        const endPointDescription = `https://api.mercadolibre.com/items/${ search }/description`;

        fetch(`https://api.mercadolibre.com/items/${ search }`)
        .then(response => response.json())
        .then(data => {
            this.setState({ product: data });
            //this.props.history.push(`/items/search=${ search }`);
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getData(params.productId);
        console.log('params.productId ', params.productId);
    }

    render() {
        const prod = this.state.product;
        return (
            <section className="page__product">
                {this.state.product && prod !== '' && (
                    <div className="page__product--iten">
                        { prod.title }
                    </div>
                )}
            </section>          
        )
    }
}
