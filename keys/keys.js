const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'developer.api.keys.json');
const privateKeyInfo = JSON.parse(fs.readFileSync(filePath));

const fetchKey = (key) => {
    return privateKeyInfo[key];
};

module.exports = {
    fetchKey
};