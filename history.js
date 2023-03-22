const fs = require('fs');
const path = require('path');

const history_path = path.join(__dirname, 'history.json');

const save_history = async (search, result) => {
    let history = [];
    if (fs.existsSync(history_path)) {
        const historyData = await fs.Promises.readFile(history_path);
        history = JSON.parse(historyData);
    }
    history.push({search: search, result: result});
    await fs.Promises.writeFile(history_path, JSON.stringify(history));
};

module.exports = { save_history } ;