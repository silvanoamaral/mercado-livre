import React, { Component } from 'react';

import Header from '../Header/Header';
class Home extends Component {

    render() {
        return (
            <div className="container">   
                <Header {...this.props} />
            </div>
        );
    }
}

export default Home;
