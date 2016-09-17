var mongoose = require('mongoose');
var User = mongoose.model('User');
var Note = mongoose.model('Note');
var config = require('../../config/env');
var path = require('path');
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
    res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/upload' + filename}});

}

exports.addNote = function(req,res,next){
    
   
    
    var content = req.body.content;
    var uid = req.user._id;
    
    
    
    var callTime = req.body.callTime;
    var error_msg;
    if(!content && !req.body.images.length){
        error_msg = '内容不能为空'
    }
    if(error_msg){
        return res.status(422).send({error_msg:error_msg});
    }

    req.body.uid = req.user._id;
    return Note.createAsync(req.body)
        .then(function(result){
            return res.status(200).json({data:result})
        })

}

exports.updateNote = function(req,res,next){
    var id = req.params.id;
    return Note.findByIdAsync(id)
        .then(function(note){
            var note = note;
            if(req.body.content){
                note.content = content
            }
            if(req.body.images){
                note.images = images;
            }
            if(req.body.callTime){
                note.callTime = req.body.callTime;
            }
            note.saveAsync().then(function(result){
                return res.status(200).json({
                    success:true,
                    data:result
                })
            })
        }).catch(function(err){
            res.status(500).send(err)
        })
}

exports.deleteNote = function(req,res,next){
    var nid = req.parmas.id;
    return Note.findByIdAndRemoveAsync(nid)
        .then(function(note){
            return res.status(200).send('删除成功')
        })
}