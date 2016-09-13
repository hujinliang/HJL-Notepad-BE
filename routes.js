var path = require('path');

module.exports = function(app){
    app.use('/auth',require('./auth'));

    // app.use('/note',require('./note'));
}