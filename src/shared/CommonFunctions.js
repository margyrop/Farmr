import { API_URL } from './Constants';
const axios = require('axios');

export async function getEthForCurrency(fiat) {
    const response = await axios.get(`${API_URL}/ethPrice`);

    return response.data[fiat];
}