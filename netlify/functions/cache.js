const NodeCache = require('node-cache');
const API_CACHE = new NodeCache({ checkperiod: 300 }); // cahce for 5 mins

module.exports = API_CACHE;
