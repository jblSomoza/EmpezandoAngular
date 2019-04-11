'use strict'

var express = require('express');
var EncuestaController = require('../controllers/encuestaController');
var md_auth = require('../middlewares/autheticated');


//Rutas
var api = express.Router();
api.get('/encuestas', md_auth.ensureAuth, EncuestaController.getEncuestas);
api.post('/encuesta', md_auth.ensureAuth, EncuestaController.addEncuestas);
api.get('/encuesta/:id', md_auth.ensureAuth, EncuestaController.getEncuesta);
api.put('/opinion/:id', md_auth.ensureAuth, EncuestaController.addUserOpinion);
api.get('/coments/:id', md_auth.ensureAuth, EncuestaController.getComentarios);
api.post('/coment/:id', md_auth.ensureAuth, EncuestaController.comentarOpinion);

module.exports = api;