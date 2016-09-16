var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./note.controller')
var multipart = require('connect-multiparty')
var router = express.Router();

router.post('/addNote',auth.isAuthenticated(),controller.addNote);
router.get('/getNoteList',auth.isAuthenticated(),controller.getNoteList);
router.get('/getNoteCount',auth.isAuthenticated(),controller.getNoteCount);
router.post('/upload',auth.isAuthenticated(),controller.upload);
router.put('/:id/updateNote',auth.isAuthenticated(),controller.updateNote);
router.get('/:id/getNoteDetail',auth.isAuthenticated(),controller.getNoteDetail);
router.delete('/:id/deleteNote',auth.isAuthenticated(),controller.deleteNote)

module.exports = router;