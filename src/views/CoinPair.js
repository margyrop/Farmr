import React from "react";
import axios from "axios";
import Layout from '../shared/Layout';



class CoinPair extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            supply: props.supply,
            borrow: props.borrow,
        };

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Layout>
                <div className="page-column">
                    <div className="highlight-container">
                        <div className="highlight">
                            <h6>{this.state.supply.asset}</h6>

                        </div>
                    </div>
                </div>
            </Layout>
        );
    }



}

export default CoinPair;