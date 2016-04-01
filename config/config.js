var config = {};
config.api = {
  'X-BlueApron-Email': process.env.USER,
  'X-BlueApron-Token': process.env.TOKEN,
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.blueapron.com.v20150501+json'
};
module.exports = config;
