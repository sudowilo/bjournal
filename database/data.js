const fs = require('node:fs');
const path = require('node:path');

const dataPath = path.join(__dirname, 'data.json');
fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});