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
        }
        console.log('catch you', error.code);
    }
}

getData();