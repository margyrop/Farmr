const axios = require('axios');

export async function getEthForCurrency(fiat) {
    const response = await axios.get('http://localhost:3001/ethPrice');

    return response.data[fiat];
}