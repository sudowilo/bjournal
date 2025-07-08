const fs = require('node:fs').promises;
const path = require('node:path');

const dataPath = path.join(__dirname, 'data.json');

async function getData() {
    try {
        const json = await fs.readFile(dataPath, 'utf-8');
        const obj = JSON.parse(json);
        return obj;
    } catch (error) {
        if (error.code == 'ENOENT') {
            await fs.writeFile(dataPath, '{"days":{}}');
            getData();
        } else {
            console.log(error);
            process.exit(0);
        }
    }
}

async function setData(dataObj) {
    try {
        const json = JSON.stringify(dataObj);
        await fs.writeFile(dataPath, json);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = { getData, setData };