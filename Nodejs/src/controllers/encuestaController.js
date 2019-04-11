'use strict'

var Encuesta = require('../models/encuesta');
var Comentario = require('../models/comentario');

function getEncuestas(req, res) {
    Encuesta.find().populate('user').exec((err, encuestas)=>{   //el populate trae las columnas que queremos ver
        if(err) return res.status(500).send({message: 'Error en la encuesta'});

        if(!encuestas) return res.status(400).send({message: 'Error al listar las encuestas'});

        return res.status(200).send({encuestas});   //Nodejs tambien acepta este metodo encuestas: encuestas
    })
}

function addEncuestas(req, res) {
    var encuesta = new Encuesta();
    var params = req.body;
    
    if(params.titulo && params.descripcion){
        encuesta.titulo = params.titulo;
        encuesta.descripcion = params.descripcion;
        encuesta.opinion = {
            si: 0,
            no: 0,
            talvez: 0,
            usuariosO: []
        };
        encuesta.listaComentarios = [];
        encuesta.user = req.user.sub;

        encuesta.save((err, encuestaGuardada)=>{
            if(err) return res.status(500).send({message: 'Error en la encuesta'});

            if(!encuestaGuardada) return res.status(400).send({message: 'Error al agregar la encuesta'});

            return res.status(200).send({encuesta: encuestaGuardada});
        })
    }else{
        res.status(200).send({
            message: 'Rellene los datos necesarios'
        });
    }
}

function getEncuesta(req, res) {
    var encuestaId = req.params.id;

    Encuesta.findById(encuestaId, (err, encuesta) =>{
        if(err) return res.status(500).send({message: 'Erro en la encuesta'});

        if(!encuesta) return res.status(400).send({message: 'Error al listar la encuesta'});

        return res.status(200).send({encuesta})
    })
}

function tipoOpinion(req, res, voto="") {
    var encuestaId = req.params.id;
    var usuarioOpinado = true;
    var votoFinal = "opinion." + voto;

    Encuesta.findById(encuestaId, (err, encuestaEncontrada)=>{
        if(err) return res.status(404).send({message: 'Error en la peticion'});

        if(!encuestaEncontrada) return res.status(500).send({message: 'Error al listar la encuesta'});

        for (let x = 0; x < encuestaEncontrada.opinion.usuariosO.length; x++) {
            if(encuestaEncontrada.opinion.usuariosO[x] === req.user.sub){
                usuarioOpinado = false;
                return res.status(500).send({message: 'El usuario ya opino en esta encuesta'});
            }
        }

        if(usuarioOpinado == true){
            Encuesta.findByIdAndUpdate(encuestaId, {$inc: {[votoFinal]: 1}}, {new: true}, (err, actualizado)=>{ //$inc aumenta en uno en uno 
                if(err) return res.status(404).send({message: 'Error en la peticion de encuesta'});

                if(!actualizado) return res.status(500).send({message: 'Error al opinar en la encuesta'});

                actualizado.opinion.usuariosO.push(req.user.sub);       //Envia los datos del usuario al array del modelo
                actualizado.save();     //Guarda los cambios
                return res.status(200).send({opinion: actualizado});    //Retorna los datos
            })  
        }
    })
}

function addUserOpinion(req, res) {
    var params = req.body;
    var opinion = params.opinion.toLowerCase();

    if(opinion == "si" || opinion == "no" || opinion == "talvez"){
        tipoOpinion(req, res, opinion);
    }else{
        res.status(400).send({message: 'Solo puede utilizar si, no y talvez'});
    }
}

function comentarOpinion(req, res) {
    var encuestaId = req.params.id;
    var params = req.body;
    var coment = new Comentario();

    if (params.comentario) {
        coment.comentario = params. comentario;
        coment.encuesta = encuestaId;
        coment.user = req.user.sub;

        coment.save((err, comentarioGuardado)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de comentario'});

            if(!comentarioGuardado) return res.status(404).send({message: 'Error al guardar el comentario'});

            Encuesta.findByIdAndUpdate(encuestaId, {new: true}, (err, encuestaEnc)=>{
                if(err) return res.status(500).send({message: 'Error en la peticion de la encuesta'});

                if(!encuestaEnc) return res.status(404).send({message: 'Error al listar la encuesta'});

                encuestaEnc.listaComentarios.push(comentarioGuardado);
                encuestaEnc.save();
                
                return res.status(200).send({
                    comentario: comentarioGuardado,
                    encuesta: encuestaEnc
                });
            })
        })
    }
}

function getComentarios(req, res) {
    var encuestaId = req.params.id;

    Comentario.find({encuesta: encuestaId}).populate('user').exec((err, comentarios)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de comentarios'});

        if(!comentarios) return res.status(404).send({message: 'Error al listar los comentarios'});

        return res.status(200).send({comentarios});
    });
}

module.exports = {
    getEncuestas,
    addEncuestas,
    getEncuesta,
    addUserOpinion,
    comentarOpinion,
    getComentarios
}