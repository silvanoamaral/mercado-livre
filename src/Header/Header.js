import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            inputValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    setParams({ search }) {
        const searchParams = new URLSearchParams();
        searchParams.set("search", search || "");
        return searchParams.toString();
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.inputValue.length > 3) {
            const url = this.setParams({ search: this.state.inputValue });
            this.props.history.push(`/items?${ url }`);
        }
    }

    render() {
        return (
            <header className="header" role="banner">
                <div className="content">
                    <h1 className="logo">
                        <Link to="/">Mercado Livre</Link>
                    </h1>
                    <div className="search">
                        <form onSubmit={ this.handleSubmit } autoComplete="off" role="search" className="search__form">
                            <input type="text"
                                className="search__form--input"
                                aria-label="search"
                                id="search"
                                name="search"
                                value={ this.state.inputValue }
                                onChange={ this.handleChange }
                                placeholder="Buscar produtos, marcas e muito mais..."
                            />
                            <button type="submit" className="search__form--btn">
                                <i className="search__form--btn-icon"><span>Buscar</span></i>
                            </button>
                        </form>
                    </div>                    
                </div>
            </header>
        );
    }
}

export default Header;
