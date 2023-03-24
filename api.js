
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');
const base = 'https://api.veriphone.io/v2'
const apiKey = "76057CC10E194813A24A27036A55F425"; // api key here

const verify= async (phone) => {
    try {
        const verifyURL = `${base}/verify?phone=${phone}&key=${apiKey}`;
        console.log(verifyURL);
        
        const res = await superagent.get(verifyURL);
        
        return [res.body];
    } catch (error) {
        console.log(error);
    }
};
//verify(6263083290);

const getDetails = async (phone, seletedDetail) => {
    const details = await verify(phone);
    return details[seletedDetail];
};

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

        return [res.body];
    } catch (error) {
        console.log(error);
    }
};
//example('FR', 'fixed_line')

module.exports = {
    verify,
    getDetails,
    example
};
