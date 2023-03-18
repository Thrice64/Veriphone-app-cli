
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');
const base = 'https://api.veriphone.io/v2'

const verifyPhone = async () => {
    try {
        const verifyURL = `${base}/verify`;
        console.log(verifyURL);
        
        const res = await superagent.get(verifyURL);
        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
};
verifyPhone();