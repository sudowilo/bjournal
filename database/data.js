const os = require('os');
const fs = require('node:fs').promises;
const path = require('path');

const configDir = path.join(os.homedir(), '.config', 'bjournal');
const dataPath = path.join(configDir, 'data.json');

// Ensure directory exists
async function ensureDirExists() {
    try {
        await fs.mkdir(configDir, { recursive: true });
    } catch (err) {
        console.log('Error creating config directory:', err);
        process.exit(1);
    }
}

function initJson(jsonObj) {
    if (!jsonObj) {
        return {
            days: {},
        };
    }
}

async function getData() {
    try {
        await ensureDirExists();
        const json = await fs.readFile(dataPath, 'utf-8');
        return json ? JSON.parse(json) : initJson();
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(dataPath, '{"days":{}}');
            return await getData();
        } else {
            console.log(error);
            process.exit(1);
        }
    }
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function setData(dataObj) {
    try {
        await ensureDirExists();
        if (!dataObj || isObjectEmpty(dataObj)) {
            console.log('this action triggers to delete all data so it aborted');
            return;
        }
        const json = JSON.stringify(dataObj);
        await fs.writeFile(dataPath, json);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = { getData, setData, dataPath };
