const axios = require('axios');

export async function getEthForCurrency(fiat) {
    const response = await axios.get('http://192.168.1.252:3001/ethPrice');

    return response.data[fiat];
}