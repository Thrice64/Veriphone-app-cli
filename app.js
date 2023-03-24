const prompts = require(`prompts`);
const api = require(`./api.js`);
const save_history = require(`./history.js`);

const verifyPhone = async (args) => {
    // phone from command line arguments
    const { phone } = args;
    // grabs the results from verify in api

    console.log(`Phone Info for ${phone}:`);
    const results = await api.verify(phone);
    // display search results
    
    const arr_results = Object.entries(results);
    //console.log(arr_results);
    

    //results.forEach((result, index) => {
        //console.log(`${index + 1}.${result.title}`);
    //});
    const response = await prompts ({
        type:'multiselect',
        name:'details',
        message: `Select the detail you would to see about ${phone}:`,
        choices: arr_results.map((result, index) => ({title: result.status, value: index})),
        maxchoices: 1,
        initial: 1,
        hint: '- select = space. return = submit'
    });
    const selectedDetail = results[response.selection[0]];
    const detailValue = await api.getDetails(phone, selectedDetail.id);
    print(selectedDetail);
    print(detailValue);
    save_history(phone, detailValue);
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