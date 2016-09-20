var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    uid:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now
    },
    calltime:{
        type:String
    },
    images:{
        type:Array
    },
    color:String
})

var Note = mongoose.model('Note',NoteSchema);
var Promise = require('bluebird');
Promise.promisifyAll(Note);
Promise.promisifyAll(Note.prototype);

module.exports = Note;