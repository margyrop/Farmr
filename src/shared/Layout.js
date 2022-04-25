import React from 'react';
import { Link } from "react-router-dom";

class Layout extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header-container">
                        <div style={{ width: '33%' }}></div>
                        <div style={{ width: '33%' }}><h2>Farmr</h2></div>
                        <div style={{ width: '33%' }} className="account-section">
                            <button className='btn' type='button'>Sign In</button>
                        </div>
                    </div>
                    <div className="toolbox-container">
                        <ul className="toolbar">
                            <Link to="/rates">Rates</Link> | {" "}
                            <Link to="/app">App</Link>
                        </ul>
                    </div>
                </header>
                <div className='main-body'>
                    {this.props.children}
                </div>
            </div>);
    }
}

export default Layout;