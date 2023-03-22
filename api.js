
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');
const base = 'https://api.veriphone.io/v2'
const apiKey = ""; // api key here

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
        let exampleURL= `${base}/example?`

        if (phoneType) {
            exampleURL+= `type=${phoneType}`;
        }
        if (country) {
            exampleURL+= `&country_code=${country}`;
        }

        exampleURL+= `&key=${apiKey}`;
        console.log(exampleURL);

        const res = await superagent.get(exampleURL);
        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
};
example('FR', 'fixed_line')

module.exports = {
    verifyPhone,
    example
};
