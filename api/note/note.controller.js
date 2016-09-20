var mongoose = require('mongoose');
var User = mongoose.model('User');
var Note = mongoose.model('Note');
var config = require('../../config/env');
var path = require('path');
var fs = require('fs')
var AVATAR_UPLOAD_FOLDER = path.join(__dirname,'../../public/upload/')

exports.getNoteList = function(req,res,next){
    var uid = req.user._id;
    Note.find({uid:uid})
        .exec().then(function(result){
            return res.status(200).json({
                data:result
            })
        })
}

exports.getNoteCount = function(req,res,next){
    var uid = req.user._id;
    Note.countAsync({uid:uid}).then(function(count){
        return res.status(200).json({
            count:count
        })
    })
        
}

exports.getNoteDetail = function(req,res,next){
    var id = req.params.id;

    return Note.findByIdAsync(id).then(function(result){
        return res.status(200).json({
            data:result
        })
    })
}

exports.upload = function(req,res){


    

    var filename = req.files.files.originalFilename ||  path.basename(req.files.files.ws.path);

//copy file to a public directory
    var targetPath =AVATAR_UPLOAD_FOLDER + filename;

    

    //copy file
    fs.createReadStream(req.files.files.path).pipe(fs.createWriteStream(targetPath));
    //return file url
    res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/upload/' + filename}});

}

exports.addNote = function(req,res,next){

    console.log(req.body)
   
    
    var content = req.body.content;
    
    var error_msg;
    if(!content){
        error_msg = '内容不能为空'
    }
    if(error_msg){
        return res.status(422).send({error_msg:error_msg});
    }

    req.body.uid = req.user._id;
    return Note.createAsync(req.body)
        .then(function(result){
            return res.status(200).json({data:result})
        }).catch(function(error){
            console.log(error)
        })

}

exports.updateNote = function(req,res,next){

    console.log(req.body)

    var id = req.params.id;
    return Note.findByIdAsync(id)
        .then(function(note){
            if(req.body.content){

                note.content = req.body.content
                
            }
            if(req.body.color){
                note.color = req.body.color
            }
            if(req.body.images){
                
            }
            if(req.body.calltime){
                note.calltime = req.body.calltime;
            }
            

            return note.saveAsync().then(function(result){
                return res.status(200).json({
                    success:true,
                    data:result
                })
            })
        }).catch(function(err){
            // next(err)
            res.status(500).send('发生错误')
        })
}

exports.deleteNote = function(req,res,next){
    var nid = req.params.id;
    return Note.findByIdAndRemoveAsync(nid)
        .then(function(note){
            return res.status(200).send('删除成功')
        })
}