import React from "react";
import axios from "axios";
import { logo_map } from '../shared/Constants';
import Layout from '../shared/Layout';

class Rates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: logo_map
        };
    }

    componentDidMount() {
        this.getRates();
    }

    render() {
        return (
            <Layout>
                <div>
                    <div className="rate-table-container">
                        <div className="rate-table">
                            <table>
                                <thead>
                                    <h5>Supply Markets</h5>
                                    <tr>
                                        <th>Asset</th>
                                        <th>APY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.rates.map((item) => (
                                            <tr key={item.asset}>
                                                <td className="token-name"><img className="token-logo" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.asset}</div></td>
                                                <td>{this.state.ratesLoading ? <div class="lds-ring"><div></div><div></div><div></div></div> : (item.supplyRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="rate-table">
                            <table>
                                <thead>
                                    <h5>Borrow Markets</h5>
                                    <tr>
                                        <th>Asset</th>
                                        <th>APY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.rates.map((item) => (
                                            <tr key={item.asset}>
                                                <td className="token-name"><img className="token-logo" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.asset}</div></td>
                                                <td>{this.state.ratesLoading ? <div class="lds-ring"><div></div><div></div><div></div></div> : (item.borrowRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </Layout>
        );
    }

    getAsset() {

    }

    getRates() {
        this.setState({
            ratesLoading: true
        });
        axios.get(`http://localhost:3001/supplyRates`).then(res => {
            if (res.data && res.data.length > 0) {
                console.log(res.data);
                var logoRates = this.mapLogos(res.data);
                this.setState({
                    rates: logoRates,
                    ratesLoading: false
                });
            }
            else {
                //Error
                console.error('Unable to retreive rates.');
            }
        })
    }

    mapLogos(rates) {
        var logoRates = rates.map(function (rate) {
            logo_map.forEach(logo => {
                if (rate.cName === logo.cName) {
                    rate.logo = logo.logo;
                    rate.asset = logo.asset;
                }
            });
            return rate;
        }).filter(rate => rate.logo);
        logoRates.sort((a, b) => {
            return a.asset.localeCompare(b.asset);
        });
        return logoRates;
    }

}

export default Rates;