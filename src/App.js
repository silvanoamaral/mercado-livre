import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home/Home';
import Search from './Search/Search';
import Product from './Product/Product';

import './Style/App.scss';
class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={ Home } />
                    <Route path='/items/:productId' component={ Product } />
                    <Route path='/items' exact search={ '?search=:search' } component={ Search } />
                </div>
            </Router>
        );
    }
}

export default App;
