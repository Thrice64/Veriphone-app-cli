
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');

// base url to use for request
const base = 'https://api.veriphone.io/v2';

// insert your api key for veriphone here
const apiKey = ""; // api key here

// verify api function to search by phone number and/or country_code id
const verify= async (phone, country_code) => {
    try {
        const verifyURL = `${base}/verify?phone=${phone}&key=${apiKey}&default-country=${country_code}`;
        
        const res = await superagent.get(verifyURL);
        return res.body;
    } catch (error) {
        console.log(error);
    }
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
        //console.log(exampleURL);

        const res = await superagent.get(exampleURL);
        //console.log(res.body);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    verify,
    example
};
