const { Router } = require('express');

const { rotasLocadoras } = require('./rotasLocadoras');

const { rotasFilmes} = require('./rotasFilmes');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasLocadoras);
rotas.use(rotasFilmes);

module.exports = rotas;