import React from "react";
import MediaQuery from "react-responsive";
import axios from "axios";
import Layout from '../shared/Layout';
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { getEthForCurrency } from "../shared/CommonFunctions";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CoinPair = () => {

    const location = useLocation();
    const { supply, borrow } = location.state;
    const [supplyAmount, setSupplyAmount] = useState();
    const [borrowAmount, setBorrowAmount] = useState();
    const [initialInvestment, setInitialInvestment] = useState();
    const [numberOfLeverages, setNumberOfLeverages] = useState();
    const [actualApy, setActualApy] = useState();
    const [interestOwed, setInterestOwed] = useState();
    const [totalGain, setTotalGain] = useState();
    const [borrowedOwed, setBorrowedOwed] = useState();
    const [ethPrice, setEthPrice] = useState();
    const [risk, setRisk] = useState();

    const previous = useRef();
    useEffect(() => {
        async function fetchEth(fiat) {
            const response = await getEthForCurrency(fiat);
            setEthPrice(response);
        }
        if (!ethPrice) {
            fetchEth('USD');
        }
        if (previous.numberOfLeverages !== numberOfLeverages) {
            compoundFarming();
        }

    });

    return (
        <Layout>
            <MediaQuery query="(min-device-width: 1024px)">
                <div className="page-column">
                    <div className="row-container">
                        <div></div>
                        <div className="highlight highlight-lg">
                            <div className="row-container row-container-lg">
                                <div className="highlight-inner spaced">
                                    <img className="token-logo" src={supply.logo}></img>
                                    <h6 className="highlight-item-header">{supply.asset}</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Supply Rate</td>
                                                <td style={{ textAlign: 'center' }}>{(supply.supplyRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Collateral Factor</td>
                                                <td style={{ textAlign: 'center' }}>{(supply.collateralFactor * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Underlying Price</td>
                                                <td style={{ textAlign: 'center' }}>{'$' + (parseFloat(ethPrice * supply.underlyingPrice).toFixed(4)) + ' USD'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <label>Amount {supply.asset}</label>
                                        <input type="number"  min="0" onChange={supplyAmountChanged} value={supplyAmount}></input>
                                    </div>
                                    <div className="row">
                                        <label>Number of Leverages</label>
                                        <input type="number"  min="0" onChange={numberOfLeveragesChanged} value={numberOfLeverages}></input>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Initial Investment</td>
                                                <td style={{ textAlign: 'center' }}>{initialInvestment ? '$' + initialInvestment.toFixed(2) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Leveraged</td>
                                                <td style={{ textAlign: 'center' }}>{initialInvestment && borrowedOwed ? `$${(initialInvestment + borrowedOwed).toFixed(2)}` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Gain</td>
                                                <td style={{ textAlign: 'center' }}>{totalGain ? '$' + totalGain.toFixed(2) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Owed</td>
                                                <td style={{ textAlign: 'center' }}>{interestOwed ? `$${(interestOwed + borrowedOwed).toFixed(2)} ($${borrowedOwed.toFixed(2)} borrowed + $${interestOwed.toFixed(2)} interest)` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Actual APY</td>
                                                <td style={{ textAlign: 'center' }}>{actualApy ? (actualApy * 100).toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div>Risk</div>
                                    <div style={{ maxWidth: '115px' }}><CircularProgressbar value={risk} text={getRiskText()} styles={buildStyles({
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        // Colors
                                        pathColor: `${getRiskColor()}`,
                                        textColor: `${getRiskColor()}`
                                    })} /></div>
                                </div>
                                <div className="highlight-inner spaced">
                                    <img className="token-logo" src={borrow.logo}></img>
                                    <h6 className="highlight-item-header">{borrow.asset}</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Borrow Rate</td>
                                                <td style={{ textAlign: 'center' }}>{(borrow.borrowRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Volatility</td>
                                                <td style={{ textAlign: 'center' }}>{borrow.volatility === 0 ? '-' : (borrow.volatility * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Price Ratio</td>
                                                <td style={{ textAlign: 'center' }}>{'1:' + parseFloat(borrow.underlyingPrice / supply.underlyingPrice).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <label>Amount {borrow.asset}</label>
                                        <input type="number" onChange={borrowAmountChanged} value={borrowAmount}></input>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1024px)">
                <div className="page-column">
                    <div className="row-container-mobile">
                        <div></div>
                        <div className="highlight-mobile highlight-lg-mobile">
                            <div className="row-container-mobile row-container-lg-mobile">
                                <div className="highlight-inner-mobile spaced-mobile">
                                    <img className="token-logo-mobile" src={supply.logo}></img>
                                    <h6 className="highlight-item-header">{supply.asset}</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Supply Rate</td>
                                                <td style={{ textAlign: 'center' }}>{(supply.supplyRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Collateral Factor</td>
                                                <td style={{ textAlign: 'center' }}>{(supply.collateralFactor * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Underlying Price</td>
                                                <td style={{ textAlign: 'center' }}>{'$' + (parseFloat(ethPrice * supply.underlyingPrice).toFixed(4)) + ' USD'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <label>Amount {supply.asset}</label>
                                        <input type="number" onChange={supplyAmountChanged} value={supplyAmount}></input>
                                    </div>
                                    <div className="row">
                                        <label>Number of Leverages</label>
                                        <input type="number" onChange={numberOfLeveragesChanged} value={numberOfLeverages}></input>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Initial Investment</td>
                                                <td style={{ textAlign: 'center' }}>{initialInvestment ? '$' + initialInvestment.toFixed(2) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Leveraged</td>
                                                <td style={{ textAlign: 'center' }}>{initialInvestment && borrowedOwed ? `$${(initialInvestment + borrowedOwed).toFixed(2)}` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Gain</td>
                                                <td style={{ textAlign: 'center' }}>{totalGain ? '$' + totalGain.toFixed(2) : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Total Owed</td>
                                                <td style={{ textAlign: 'center' }}>{interestOwed ? `$${(interestOwed + borrowedOwed).toFixed(2)} ($${borrowedOwed.toFixed(2)} borrowed + $${interestOwed.toFixed(2)} interest)` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Actual APY</td>
                                                <td style={{ textAlign: 'center' }}>{actualApy ? (actualApy * 100).toFixed(2) + '%' : '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div>Risk</div>
                                    <div style={{ maxWidth: '115px' }}><CircularProgressbar value={risk} text={getRiskText()} styles={buildStyles({
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        // Colors
                                        pathColor: `${getRiskColor()}`,
                                        textColor: `${getRiskColor()}`
                                    })} /></div>
                                <div className="highlight-inner-mobile spaced-mobile">
                                    <img className="token-logo-mobile" src={borrow.logo}></img>
                                    <h6 className="highlight-item-header">{borrow.asset}</h6>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="table-label-column">Borrow Rate</td>
                                                <td style={{ textAlign: 'center' }}>{(borrow.borrowRate * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Volatility</td>
                                                <td style={{ textAlign: 'center' }}>{borrow.volatility === 0 ? '-' : (borrow.volatility * 100).toFixed(2) + '%'}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-label-column">Price Ratio</td>
                                                <td style={{ textAlign: 'center' }}>{'1:' + parseFloat(borrow.underlyingPrice / supply.underlyingPrice).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <label>Amount {borrow.asset}</label>
                                        <input type="number" onChange={borrowAmountChanged} value={borrowAmount}></input>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </MediaQuery>
        </Layout>
    );

    function supplyAmountChanged(e) {
        setSupplyAmount(e.target.value);
        const initial = e.target.value * supply.underlyingPrice * ethPrice;
        setInitialInvestment(initial);
        setBorrowAmount(parseFloat(supply.underlyingPrice / borrow.underlyingPrice) * e.target.value);
    }

    function borrowAmountChanged(e) {
        setBorrowAmount(e.target.value);
        setSupplyAmount(parseFloat(borrow.underlyingPrice / supply.underlyingPrice) * e.target.value);
    }

    function numberOfLeveragesChanged(e) {
        setNumberOfLeverages(e.target.value);
    }

    function compoundFarming() {
        var value = supplyAmount * supply.underlyingPrice * ethPrice;
        var collateral = 0;
        var totalOwed = collateral;
        for (var i = 0; i < numberOfLeverages; i++) {
            if (i === 0) {
                collateral = value * supply.collateralFactor;
                value += collateral;
            } else {
                collateral *= supply.collateralFactor;
                value += collateral;
            }
            totalOwed += collateral;
        }
        var interestOwed = totalOwed * borrow.borrowRate;
        var realizedGain = (value * supply.supplyRate) - interestOwed;
        var actualApy = realizedGain / initialInvestment;
        setActualApy(actualApy);
        setTotalGain(realizedGain);
        setInterestOwed(interestOwed);
        setBorrowedOwed(totalOwed);
        calculateRisk();
    }

    function calculateRisk() {
        // Function will be on a scale from 1 to 100
        // Need to incorperate volitilty, number of leverages, and borrow APY
        var risk = (borrow.volatility * 1000) + Math.pow(numberOfLeverages, 2) + Math.pow(borrow.borrowRate * 100, 1.2);
        setRisk(supplyAmount > 0 ? risk : 0);
    }

    function getRiskText() {
        if (!risk) {
            return '-';
        }
        if (risk < 33) {
            return 'Low';
        } else if (risk < 66) {
            return 'Moderate';
        }
        return 'High';
    }

    function getRiskColor() {
        if (!risk) {
            return '#2ebf58';
        }
        if (risk < 33) {
            return '#2ebf58';
        } else if (risk < 66) {
            return '#b5b552';
        }
        return '#e12f2f';
    }

}

export default CoinPair;