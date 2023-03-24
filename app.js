const prompts = require(`prompts`);
const api = require(`./api.js`);
const save = require(`./history.js`);

const _propertyPrompt = async (phone, results) => {
    // creates an array with only the property names
    const displayResults = Object.keys(results);
   
    // prompts the user what info they would like to see. 
    return await prompts ({
        type:'multiselect',
        name:'property',
        message: `Select the property you would to see about ${phone}:`,
        choices: displayResults,
        max: 2,
        hint: '- select = space. return = submit'
    });
}

const getDetails = async (selectedProp, results) => {
    // holds the values from results
    const resultValues = Object.values(results);

    // holds the keys from results
    const resultKeys = Object.keys(results);

    // container to hold selected keys and their values
    const selectedDetails ={};
    for (let i = 0; i <selectedProp.length; i++) {
        selectedDetails[resultKeys[selectedProp[i]]] = resultValues[selectedProp[i]];
    };

    return selectedDetails;
};

const _outPut = async(phone, details) => {
    console.log(`Search Results for ${phone}: \n`);
    
    // loops and outputs results
   for (let key in details) {
        console.log(key + ": " + details[key]);
    };
};

const verifyPhone = async (args) => {
    // phone from command line arguments
    const { phone } = args;

    console.log(`Phone Info for ${phone}:`);

    // grabs the results from verify in api
    const results = await api.verify(phone);
    //console.log(results);

    // grabs the selected property_ids by the user
    const property_ids = await _propertyPrompt(phone, results);
    //console.log(property_ids.property);

    // grabs the values of the selected property_ids
    const details = await getDetails(property_ids.property, results);
    //console.log(details);

    // prints out the selected results
    await _outPut(phone, details);

    // saves history to history.json
    save.save_history(phone, details);

};

const examplePhone = async (country, type) => {
    const { countryCode } = country;
    const { phoneType } = type;

    const results = await api.example(country, type);

    console.log(`Phone Info for: ${results.country_code} \n`,
                'Verified: ', results.status, '\n',
                'Phone Type: ', results.phone_type, '\n',
                'Country Prefix', results.country_prefix, '\n',
                'Local Number: ', results.local_number, '\n',
                'International Number: ', results.international_number, '\n',
                );

};



module.exports = {
    verifyPhone,
    examplePhone
}