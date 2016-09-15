/**
 * Created by jialao on 2016/9/15.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Note = mongoose.model('Note');

var auth = require('../auth/auth.service')

if(process.env.NODE_ENV === 'development'){
    User.countAsync().then(function(count){
        if(count === 0){
            User.createAsync({
                nickname:'HJL',
                email:'1617451312@qq.com',
                password:'111111'
            }).then(function(user){


                var token = auth.signToken(user._id);

                console.log(token)

                return Note.createAsync({
                    uid:user._id,
                    content:'吃饭',
                    calltime:Date.now()
                    
                },{
                    uid:user._id,
                    content:'学习',
                    calltime:Date.now()
                },{
                    uid:user._id,
                    content:'睡觉',
                    calltime:Date.now()
                },{
                    uid:user._id,
                    content:'看书',
                    calltime:Date.now()
                })
            })
        }
    })
}