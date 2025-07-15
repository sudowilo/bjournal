const path = require('node:path');
const fs = require('node:fs').promises;
const { getData, dataPath } = require('../database/data');

function getDataPath() {
    console.log(dataPath);
}

async function getBackup(backupPath) {
    try {
        const validPath = path.isAbsolute(backupPath);
        const normalizedPath = path.join(path.normalize(backupPath), 'data.json');

        if (!validPath) {
            console.log('please enter an absolute path');
            return;
        }
        const data = await getData();
        const json = JSON.stringify(data);
        await fs.writeFile(normalizedPath, json);
        console.log('saved backup in: ' + normalizedPath);
    } catch (error) {
        if (error.code == 'ENOENT') {
            console.log("please first create your directory manually then try to backup in that path (i don't want you forget it)");
        } else {
            console.log(error);
        }
    }
}

module.exports = { getDataPath, getBackup };