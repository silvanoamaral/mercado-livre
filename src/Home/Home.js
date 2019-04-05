import React, { Component } from 'react';
class Home extends Component {
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
            <div className="content">
                <div className="container">          
                    <section className="section">
                        <form onSubmit={ this.handleSubmit } autoComplete="off">
                            <input type="text"
                                className="input"
                                id="searchInput"
                                value={ this.state.inputValue }
                                onChange={ this.handleChange }
                                placeholder="Search..."
                            />
                            <button className="button is-info" onClick={this.addItem}>
                                Add Item
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}

export default Home;
