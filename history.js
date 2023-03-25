const fs = require('fs');
const path = require('path');

// holds the path of the history.json file
const history_path = path.join(__dirname, 'history.json');

// this function recieves the new searched and resultCount
// Either adds them to the exising history.json or creates a new one with the search  
const save_history = async (searched, resCount) => {
    // container to hold existing/updated history
    let history = [];

    //checks to see if history.json file exists to grab prehistory data
    if (fs.existsSync(history_path)) {
        const historyData = await fs.promises.readFile(history_path, 'utf-8');
        history = JSON.parse(historyData);
    }

    // adds the newly searched phone and result count to the history.json file
    history.push({search: searched, resultCount: resCount});
    await fs.promises.writeFile(history_path, JSON.stringify(history), 'utf-8');
};
// exports save_history for other files to use
module.exports = { save_history } ;

