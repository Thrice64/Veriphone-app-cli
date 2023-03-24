const fs = require('fs');
const path = require('path');

const history_path = path.join(__dirname, 'history.json');

const save_history = async (search, result) => {
    let history = [];
    if (fs.existsSync(history_path)) {
        const historyData = await fs.promises.readFile(history_path, 'utf-8');
        history = JSON.parse(historyData);
    }
    history.push({phone: search, result: result});
    await fs.promises.writeFile(history_path, JSON.stringify(history), 'utf-8');
};

module.exports = { save_history } ;

