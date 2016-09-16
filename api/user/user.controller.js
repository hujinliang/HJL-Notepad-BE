/**
 * Created by jialao on 2016/9/16.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getMe = function(req,res){
    var userId = req.user._id;
    User.findByIdAsync(userId).then(function(user){
        return res.status(200).json(user)
    }).catch(function(err){
        return res.status(500).send('服务器错误')
    })
}