module.exports.ServerPort = 5000;
let ENV = 'DEV';

module.exports.base_url = '';
if (ENV == 'UAT') {
    module.exports.base_url = '';
} else if (ENV == 'PROD') {
    module.exports.base_url = '';
}