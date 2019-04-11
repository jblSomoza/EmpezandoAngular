'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EncuestaSchema = Schema({
    titulo: String,
    descripcion: String,
    opinion: {
        si: Number,
        no: Number,
        talvez: Number,
        usuariosO: []
    },
    listaComentarios: [],
    user: { type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Encuesta', EncuestaSchema);