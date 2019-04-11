'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ComentarioSchema = Schema({
    comentario: String,
    encuesta: { type: Schema.ObjectId, ref: 'Encuesta'},
    user: { type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Comentario', ComentarioSchema);