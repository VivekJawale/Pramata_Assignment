const axios= require('axios');
const liveRateController = {
    getliverate: async (req, res) => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                  ids: 'bitcoin,ethereum,litecoin,ripple,cardano,binancecoin,polkadot,chainlink,stellar,monero,tezos',
                  vs_currencies: 'usd',
                },
              });
              
            const rates = response.data;
            console.log(rates);
    return res.status(200).send(rates);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to fetch live rates' });
        }
    }
    ,

}

module.exports = liveRateController;