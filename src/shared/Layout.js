import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from "react-router-dom";
import GitHubLogo from '../assets/logos/GitHub.png';
import CompoundLogo from '../assets/logos/compound-logo.svg';

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
                        <div style={{ width: '33%' }}><Link to="/rates"><h2>Farmr</h2></Link></div>
                        <div style={{ width: '33%' }} className="account-section">
                            <button className='btn' type='button'>Sign In</button>
                        </div>
                    </div>
                </header>
                <div className='main-body'>
                    {this.props.children}
                </div>
                <MediaQuery query="(min-device-width: 1024px)">
                    <div className='footer'>
                        <div className='logo'>
                            <a target="_blank" href="http://www.github.com/margyrop"><img src={GitHubLogo}></img></a>
                        </div>
                        <div>
                            <p style={{ textAlign: "center" }}>© Farmr 2022</p>
                            <p style={{ color: 'lightgrey' }}>Farmr© has no affiliation with Compound©</p>
                        </div>

                        <div className='logo'>
                            <a target="_blank" href=" https://app.compound.finance/#"><img src={CompoundLogo}></img></a>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1024px)">
                    <div className='footer-mobile'>
                        <div className='logo'>
                            <a target="_blank" href="http://www.github.com/margyrop"><img className="footer-img-mobile" src={GitHubLogo}></img></a>
                        </div>
                        <div>
                            <p style={{ textAlign: "center" }}>© Farmr 2022</p>
                            <p style={{ color: 'lightgrey' }}>Farmr© has no affiliation with Compound©</p>
                        </div>

                        <div className='logo'>
                            <a target="_blank" href=" https://app.compound.finance/#"><img className="footer-img-mobile" src={CompoundLogo}></img></a>
                        </div>
                    </div>
                </MediaQuery>
            </div>);
    }
}

export default Layout;