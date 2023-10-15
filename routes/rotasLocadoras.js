const { Router } = require('express');

const { getLocadoras, addLocadora, updateLocadora, deleteLocadora, getLocadoraPorCodigo } = require('../controllers/locadoraController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasLocadoras = new Router();

rotasLocadoras.route('/locadora')
   .get(verificaJWT , getLocadoras)
   .post(verificaJWT , addLocadora)
   .put(verificaJWT , updateLocadora)

rotasLocadoras.route('/locadora/:codigo')
   .get(verificaJWT , getLocadoraPorCodigo)
   .delete(verificaJWT , deleteLocadora)

module.exports = { rotasLocadoras };