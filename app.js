const prompts = require(`prompts`);
const api = require(`./api.js`);
const save = require(`./history.js`);

// function that recieves the phone and res.body and returns the selected properties by the user
const _propertyPrompt = async (phone, results) => {
    // creates an array with only the property names
    const displayResults = {} ;
    for (let key in results) {
        if(results[key] !== '') {
            displayResults[key] = results[key];
        }
    };
    // prompts the user what info they would like to see. 
    const displayPrompt =  await prompts ({
        type:'multiselect',
        name:'property',
        message: `Select the info you would to see on ${phone}:`,
        choices: Object.keys(displayResults),
        max: displayResults.length,
        hint: '- select = space. return = submit'
    });

    // returns the prompt results and displayResults object
    return {displayPrompt, displayResults: displayResults};
}

// function that recieves the selected properties and res.body
// returns an object of both the key and values of the selected properties from res.body
const getDetails = async (selectedProp, results) => {
    // holds the values from results
    const resultValues = Object.values(results);

    // holds the keys from results
    const resultKeys = Object.keys(results);

    // container to hold selected keys and their values
    const selectedDetails ={};
    for (let i = 0; i < selectedProp.length; i++) {
        selectedDetails[resultKeys[selectedProp[i]]] = resultValues[selectedProp[i]];
    };

    return selectedDetails;
};

// function recieves the searched phone and the selected details to create a clean output for the user
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
    // Countrycode from command line arguments
    const { Countrycode } = args;

    // grabs the results from verify in api
    const results = await api.verify(phone, Countrycode);

    // grabs the selected property_ids by the user
    const properties = await _propertyPrompt(phone, results);

    const property_ids = properties.displayPrompt.property;

    // contains the results with no empty strings
    const new_results = properties.displayResults;
    //contains the new result count
    const resCount = Object.keys(new_results).length;

    // grabs the values of the selected property_ids
    const details = await getDetails(property_ids, new_results);

    // prints out the selected results
    await _outPut(phone, details);

    // saves history to history.json
    save.save_history(phone, resCount);

};

const examplePhone = async (country, type) => {
    const { countryCode } = country;
    const { phoneType } = type;

    const history = country + ', ' + type;

    const results = await api.example(country, type);

    console.log(`Phone Info for: ${results.country_code} \n`,
                'Verified: ', results.status, '\n',
                'Phone Type: ', results.phone_type, '\n',
                'Country Prefix:', results.country_prefix, '\n',
                'Local Number: ', results.local_number, '\n',
                'International Number: ', results.international_number, '\n',
                'e164: ', results.e164
                );
    

    save.save_history(history, Object.keys(results).length);

};

module.exports = {
    verifyPhone,
    examplePhone
}