
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');
const base = 'https://api.veriphone.io/v2'
const apiKey = "76057CC10E194813A24A27036A55F425";

const verifyPhone = async (phone) => {
    try {
        const verifyURL = `${base}/verify?phone=${phone}&key=${apiKey}`;
        console.log(verifyURL);
        
        const res = await superagent.get(verifyURL);
        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
};
//verifyPhone(6263083290);

const example = async (country, phoneType) => {
    try {
        let verifyURL = `${base}/example?`

        if (phoneType) {
            verifyURL += `type=${phoneType}`;
        }
        if (country) {
            verifyURL += `&country_code=${country}`;
        }

        verifyURL += `&key=${apiKey}`;
        console.log(verifyURL);

        const res = await superagent.get(verifyURL);
        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
};
//example('FR', 'fixed_line')

module.exports = {
    verifyPhone,
    example
};
