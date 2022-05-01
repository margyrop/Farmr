import React from "react";
import MediaQuery from "react-responsive";
import axios from "axios";
import { logo_map, API_URL } from '../shared/Constants';
import Layout from '../shared/Layout';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { SUPPLY, BORROW, ASC, DESC } from '../shared/Constants';



class Rates extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rates: logo_map,
            sortApy: "",
            sortAsset: "",
            selectedSupply: {},
            selectedBorrow: {}
        };

    }

    componentDidMount() {
        this.getRates();
        this.setState({
            autoRefreshData: setInterval(this.getRates.bind(this), 30000)
        })
    }

    render() {
        return (
            <Layout>

                <div className="page-column">
                    <MediaQuery query="(min-device-width: 1024px)">
                        <div className="row-container">
                            <div></div>
                            <div className="highlight">
                                <h5>{`Current ${this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? 'Selected ' : 'Maximum'} Rate Yields`}</h5>
                                <div className="row-container">
                                    <div className="highlight-column">
                                        <h6>Outright</h6>
                                        <div className="highlight-inner">
                                            {this.state.ratesLoading || !this.state.highestYield ? this.highlightLoading() :
                                                (<div>
                                                    <div className="pair-header">
                                                        <div>
                                                            <img className="token-logo" src={this.state.highestYield.logo} />
                                                            <h6 className="highlight-item-header">{this.state.highestYield.asset}</h6>
                                                        </div>
                                                    </div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="table-label-column">Supply Rate</td>
                                                                <td style={{ textAlign: 'center' }}>{(this.state.highestYield.supplyRate * 100).toFixed(2) + '%'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="table-label-column">Collateral Factor</td>
                                                                <td style={{ textAlign: 'center' }}>{(this.state.highestYield.collateralFactor * 100).toFixed(2) + '%'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="table-label-column">Underlying Price</td>
                                                                <td style={{ textAlign: 'center' }}>{parseFloat(this.state.highestYield.underlyingPrice).toFixed(4) + ' ETH'}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="highlight-column">
                                        <h6>Pair</h6>
                                        <Link to={this.state.ratesLoading || !this.state.highestYield ? '' : '/pair'} state={{ supply: this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedSupply : this.state.highestYield, borrow: this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedBorrow : this.state.lowestBorrowRate }}>
                                            <div className="highlight-inner clickable">
                                                {this.state.ratesLoading || !this.state.highestYield ? this.highlightLoading() :
                                                    (<div>
                                                        <div className="pair-header">
                                                            <div style={{ width: '33%' }}>
                                                                <img className="token-logo" src={this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedSupply.logo : this.state.highestYield.logo} />
                                                                <h6 className="highlight-item-header">{this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedSupply.asset : this.state.highestYield.asset}</h6>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', height: `100%` }}><FontAwesomeIcon icon={faRepeat} /></div>
                                                            <div style={{ width: '33%' }}>
                                                                <img className="token-logo" src={this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedBorrow.logo : this.state.lowestBorrowRate.logo} />
                                                                <h6 className="highlight-item-header">{this.state.selectedBorrow.asset && this.state.selectedSupply.asset ? this.state.selectedBorrow.asset : this.state.lowestBorrowRate.asset}</h6>
                                                            </div>
                                                        </div>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="table-label-column">Net Supply Rate</td>
                                                                    <td style={{ textAlign: 'center' }}>{this.getNetSupplyRate()}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="table-label-column">Volatility</td>
                                                                    <td style={{ textAlign: 'center' }}>{this.getVolitility()}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="table-label-column">Price Ratio</td>
                                                                    <td style={{ textAlign: 'center' }}>{this.getPriceRatio()}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>)
                                                }
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </MediaQuery>
                    <MediaQuery query="(max-device-width: 1024px)">
                        <div className="row-container-mobile">
                            <div></div>
                            <div className="highlight-mobile">
                                <h5>Current Maximum Rate Yields</h5>
                                <div className="row-container-mobile">
                                    <div className="highlight-column-mobile">
                                        <h6>Outright</h6>
                                        <div className="highlight-inner-mobile">
                                            {this.state.ratesLoading || !this.state.highestYield ? this.highlightLoading() :
                                                (<div>
                                                    <div className="pair-header">
                                                        <div>
                                                            <img className="token-logo" src={this.state.highestYield.logo} />
                                                            <h6 className="highlight-item-header">{this.state.highestYield.asset}</h6>
                                                        </div>
                                                    </div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="table-label-column">Supply Rate</td>
                                                                <td style={{ textAlign: 'center' }}>{(this.state.highestYield.supplyRate * 100).toFixed(2) + '%'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="table-label-column">Collateral Factor</td>
                                                                <td style={{ textAlign: 'center' }}>{(this.state.highestYield.collateralFactor * 100).toFixed(2) + '%'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="table-label-column">Underlying Price</td>
                                                                <td style={{ textAlign: 'center' }}>{parseFloat(this.state.highestYield.underlyingPrice).toFixed(4) + ' ETH'}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    <div className="highlight-column-mobile">
                                        <h6>Pair</h6>
                                        <Link to="/pair" state={{ supply: this.state.highestYield, borrow: this.state.lowestBorrowRate }}>
                                            <div className="highlight-inner-mobile clickable">
                                                {this.state.ratesLoading || !this.state.highestYield ? this.highlightLoading() :
                                                    (<div>
                                                        <div className="pair-header">
                                                            <div style={{ width: '33%' }}>
                                                                <img className="token-logo" src={this.state.highestYield.logo} />
                                                                <h6 className="highlight-item-header">{this.state.highestYield.asset}</h6>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', height: `100%` }}><FontAwesomeIcon icon={faRepeat} /></div>
                                                            <div style={{ width: '33%' }}>
                                                                <img className="token-logo" src={this.state.lowestBorrowRate.logo} />
                                                                <h6 className="highlight-item-header">{this.state.lowestBorrowRate.asset}</h6>
                                                            </div>
                                                        </div>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="table-label-column">Net Supply Rate</td>
                                                                    <td style={{ textAlign: 'center' }}>{((this.state.highestYield.supplyRate - this.state.lowestBorrowRate.borrowRate) * 100).toFixed(2) + '%'}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="table-label-column">Volatility</td>
                                                                    <td style={{ textAlign: 'center' }}>{this.state.lowestBorrowRate.volatility === 0 ? '-' : (this.state.lowestBorrowRate.volatility * 100).toFixed(2) + '%'}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="table-label-column">Price Ratio</td>
                                                                    <td style={{ textAlign: 'center' }}>{'1:' + parseFloat(this.state.highestYield.underlyingPrice / this.state.lowestBorrowRate.underlyingPrice).toFixed(2)}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>)
                                                }
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </MediaQuery>
                    <MediaQuery query="(max-device-width: 1024px)">
                        <div className="row-container-mobile">
                            <div className="rate-table-mobile">
                                <h5>Supply Markets</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th onClick={this.sortSupplyByApy.bind(this)} className='sortable'>APY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rates.map((item) => (
                                                <tr key={item.asset} className={`mobile asset-row ${this.state.selectedSupply.asset === item.asset ? 'selected' : ''}`} onClick={this.selectSupply.bind(this, item)}>
                                                    <td className="token-name-mobile"><img className="token-logo-mobile" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.underlyingSymbol}</div></td>
                                                    <td>{this.state.ratesLoading ? <div className="lds-ring"><div></div><div></div><div></div></div> : (item.supplyRate * 100).toFixed(2) + '%'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="rate-table-mobile">
                                <h5>Borrow Markets</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th onClick={this.sortBorrowByApy.bind(this)} className='sortable'>APY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rates.map((item) => (
                                                <tr key={item.asset} className={`mobile asset-row ${this.state.selectedBorrow.asset === item.asset ? 'selected' : ''}`} onClick={this.selectBorrow.bind(this, item)}>
                                                    <td className="token-name-mobile"><img className="token-logo-mobile" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.underlyingSymbol}</div></td>
                                                    <td>{this.state.ratesLoading ? <div className="lds-ring"><div></div><div></div><div></div></div> : (item.borrowRate * 100).toFixed(2) + '%'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1024px)">
                        <div className="row-container">
                            <div className="rate-table">
                                <h5>Supply Markets</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th onClick={this.sortSupplyByApy.bind(this)} className='sortable'>APY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rates.map((item) => (
                                                <tr key={item.asset} className={`asset-row ${this.state.selectedSupply.asset === item.asset ? 'selected' : ''}`} onClick={this.selectSupply.bind(this, item)}>
                                                    <td className="token-name"><img className="token-logo" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.asset}</div></td>
                                                    <td>{this.state.ratesLoading ? <div className="lds-ring"><div></div><div></div><div></div></div> : (item.supplyRate * 100).toFixed(2) + '%'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="rate-table">
                                <h5>Borrow Markets</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th onClick={this.sortBorrowByApy.bind(this)} className='sortable'>APY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rates.map((item) => (
                                                <tr key={item.asset} className={`asset-row ${this.state.selectedBorrow.asset === item.asset ? 'selected' : ''}`} onClick={this.selectBorrow.bind(this, item)}>
                                                    <td className="token-name"><img className="token-logo" src={item.logo}></img><div style={{ marginLeft: '10px' }}>{item.asset}</div></td>
                                                    <td>{this.state.ratesLoading ? <div className="lds-ring"><div></div><div></div><div></div></div> : (item.borrowRate * 100).toFixed(2) + '%'}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </MediaQuery>

                </div>
            </Layout>
        );
    }

    getNetSupplyRate() {
        if (this.state.selectedBorrow.asset && this.state.selectedSupply.asset) {
            return ((this.state.selectedSupply.supplyRate - this.state.selectedBorrow.borrowRate) * 100).toFixed(2) + '%'
        }
        return ((this.state.highestYield.supplyRate - this.state.lowestBorrowRate.borrowRate) * 100).toFixed(2) + '%';
    }

    getVolitility() {
        if (this.state.selectedBorrow.asset && this.state.selectedSupply.asset) {
            return this.state.selectedBorrow.volatility === 0 ? '-' : (this.state.selectedBorrow.volatility * 100).toFixed(2) + '%';
        }
        return this.state.lowestBorrowRate.volatility === 0 ? '-' : (this.state.lowestBorrowRate.volatility * 100).toFixed(2) + '%';
    }

    getPriceRatio() {
        if (this.state.selectedBorrow.asset && this.state.selectedSupply.asset) {
            return '1:' + parseFloat(this.state.selectedSupply.underlyingPrice / this.state.selectedBorrow.underlyingPrice).toFixed(2);
        }
        return '1:' + parseFloat(this.state.highestYield.underlyingPrice / this.state.lowestBorrowRate.underlyingPrice).toFixed(2);
    }

    selectSupply(asset) {
        this.setState({ selectedSupply: asset.asset === this.state.selectedSupply.asset ? {} : asset })
    }

    selectBorrow(asset) {
        this.setState({ selectedBorrow: asset.asset === this.state.selectedBorrow.asset ? {} : asset })
    }

    highlightLoading() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '33%' }}></div>
                <div>
                    <div style={{ width: '33%' }}></div><div className="lds-ring"><div></div><div></div><div></div></div><div style={{ width: '33%' }}></div>
                </div>
                <div style={{ height: '33%' }}></div>
            </div>

        );
    }

    sortBorrowByApy() {

        var borrows = this.state.rates.sort((a, b) => this.state.sortApy === DESC ? a.borrowRate - b.borrowRate : b.borrowRate - a.borrowRate);
        this.setState({
            sortApy: this.state.sortApy === DESC ? ASC : DESC,
            rates: [...borrows]
        });
    }

    sortSupplyByApy() {
        var supplies = this.state.rates.sort((a, b) => this.state.sortApy === DESC ? a.supplyRate - b.supplyRate : b.supplyRate - a.supplyRate);
        this.setState({
            sortApy: this.state.sortApy === DESC ? ASC : DESC,
            rates: [...supplies]
        });

    }

    getRates() {
        this.setState({
            ratesLoading: true
        });
        axios.get(`${API_URL}/supplyRates`).then(res => {
            if (res.data && res.data.length > 0) {
                var logoRates = this.mapLogos(res.data);
                this.setState({
                    rates: logoRates,
                    ratesLoading: false
                });
                this.calculateBestYields(logoRates);
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
            return this.state.sortApy === ASC ? a.supplyRate - b.supplyRate : b.supplyRate - a.supplyRate
        });
        return logoRates;
    }

    calculateBestYields(rates) {
        this.calculateBorrowVolatility(rates);

    }

    calculateBorrowVolatility(rates) {
        axios.post(`${API_URL}/volatility`, { rates: rates }).then((res) => {
            var supplyRates = [...res.data];
            supplyRates.sort((a, b) => b.supplyRate - a.supplyRate);
            var borrowRates = [...res.data];
            borrowRates.sort((a, b) => a.borrowRate - b.borrowRate);
            this.setState({
                highestYield: supplyRates[0],
                lowestBorrowRate: borrowRates[0],
                rates: res.data
            });
        });
    }

}

export default Rates;