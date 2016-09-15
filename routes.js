var path = require('path');

var express = require('express');
var router = express.Router()
router.get('/hehe',function(req,res){
    res.json({data:'hehe'})
})


module.exports = function(app){
    app.use('/auth',require('./auth'));

    app.use('/note',require('./api/note'));
    
    app.use('/hello',router)
}