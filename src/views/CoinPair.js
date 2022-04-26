import React from "react";
import axios from "axios";
import Layout from '../shared/Layout';
import { useLocation } from "react-router-dom";


const CoinPair = () => {

    const location = useLocation();
    const { supply, borrow } = location.state;
    return (
        <Layout>
            <div className="page-column">
                <div className="row-container">
                    <div></div>
                    <div className="highlight">
                        <div className="row-container">
                            <div className="highlight-inner spaced">
                                <h6 className="highlight-item-header">{supply.asset}</h6>

                            </div>
                            <div className="highlight-inner spaced">
                                <h6 className="highlight-item-header">{borrow.asset}</h6>

                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </Layout>
    );




}

export default CoinPair;