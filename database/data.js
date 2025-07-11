const fs = require('node:fs').promises;
const { copyFileSync } = require('node:fs');
const path = require('node:path');

const dataPath = path.join(__dirname, 'data.json');

function initJson(jsonObj) {
    if (!jsonObj) {
        return {
            days: {}
        };
    }
}

async function getData() {
    try {
        const json = await fs.readFile(dataPath, 'utf-8');
        let obj = {};
        if (!json) {
            obj = initJson(json);
        } else {
            obj = JSON.parse(json);
        }
        return obj;
    } catch (error) {
        console.log(error);
        if (error.code == 'ENOENT') {
            await fs.writeFile(dataPath, '{"days":{}}');
            getData();
        } else {
            console.log(error.code);
            process.exit(0);
        }
    }
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function setData(dataObj) {
    try {
        if (!dataObj || isObjectEmpty(dataObj)) {
            console.log('this action triggers to delete all data so it aborted');
            return;
        }
        const json = JSON.stringify(dataObj);
        await fs.writeFile(dataPath, json);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = { getData, setData };