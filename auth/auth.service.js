var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/env');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');

function authToken(credentialsRequired){
    return compose()
        .use(function(req,res,next){
            if(req.query&&req.query.hasOwnProperty('access_token')){
                req.header.authorization = 'Bearer '+req.query.access_token;
            }
            next();
        })
        .use(expressJwt({
            secret:config.session.secrets,
            credentialsRequired:credentialsRequired
        }))
}

function isAuthenticated(){
    return compose()
        .use(authToken(true))
        .use(function(err,req,res,next){
            
            console.log(err)
            
            if(err.name === 'UnauthorizedError'){
                return res.status(401).send('error');
            }
            next();
        })
        .use(function(req,res,next){
            
            console.log('success')
            
            User.findById(req.user._id,function(err,user){
                if(err) return res.status(500).send();
                if(!user){
                    console.log('wtf')
                }
                req.user = user;
                next();
            })
        })
}

function signToken(id){
    return jwt.sign({
        _id:id
    },config.session.secrets,{expiresIn:'1y'})
}

function snsPassport(){
    return compose()
        .use(authToken(false))
        .use(function(req,res,next){
            req.session.passport = {
                redirectUrl:req.query.redirectUrl || '/'
            };
            if(req.user){
                req.session.passport.userId = req.user._id;
            }
            next();
        })
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.snsPassport = snsPassport;