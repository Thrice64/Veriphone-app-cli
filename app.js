const prompts = require(`prompts`);
const api = require(`./api.js`);
const save_history = require(`./history.js`);

const verifyPhone = async (args) => {
    // phone from command line arguments
    const { phone } = args;
    // grabs the results from verify in api
    const results = await api.verify(phone);
    // display search results
    if (results) {
        console.log(results);
    }
    console.log(`Phone Info for ${phone}:`);
    //results.forEach((result, index) => {
        //console.log(`${index + 1}.${result.title}`);
    //});

    const response = await prompts ({
        type:'multiselect',
        name:'details',
        message: `Select the detail you would to see about ${phone}:`,
        choices: results.map((results, index) => ({title: results.title, value: index})),
        maxchoices: 1,
        iniial: 1,
        hint: '- select = space. return = submit'
    });

    const selectedDetail = results[response.selection[0]];
    const detailValue = await getDetails(args, selectedDetail.id);

    save_history(phone, results);

};

const examplePhone = async (args) => {
    
};

module.exports = {
    verifyPhone,
    examplePhone
}