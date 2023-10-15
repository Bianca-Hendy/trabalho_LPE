const { pool } = require('../config');
const Locadora = require('../entities/locadora');

const getLocadorasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM locadoras ORDER BY nome`);
        return rows.map((locadora) => new Locadora(locadora.codigo, locadora.nome, locadora.endereco, locadora.numero));
    } catch (err){
        throw "Erro: " + err;
    }
}

const addLocadoraDB = async (body) => {
    try {   
        const { nome,endereco, numero } = body; 
        const results = await pool.query(`INSERT INTO locadoras (nome,endereco,numero) 
            VALUES ($1, $2, $3)
            returning codigo, nome, endereco, numero`,
        [nome,endereco,numero]);
        const locadora = results.rows[0];
        return new Locadora(locadora.codigo, locadora.nome,locadora.endereco, locadora.numero); 
    } catch (err) {
        throw "Erro ao inserir a locadora: " + err;
    }    
}


const updateLocadoraDB = async (body) => {
    try {   
        const { codigo, nome, endereco, numero }  = body; 
        const results = await pool.query(`UPDATE locadoras set nome = $2, endereco = $3, numero= $4 where codigo = $1 
        returning codigo, nome, endereco, numero`,
        [codigo, nome, endereco, numero]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const locadora = results.rows[0];
        return new Locadora(locadora.codigo, locadora.nome, locadora.endereco, locadora.numero); 
    } catch (err) {
        throw "Erro ao alterar a locadora: " + err;
    }      
}

const deleteLocadoraDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM locadoras where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Locadora removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a locadora: " + err;
    }     
}

const getLocadoraPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM locadoras where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const locadora = results.rows[0];
            return new Locadora(locadora.codigo, locadora.nome, locadora.endereco, locadora.numero); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a locadora: " + err;
    }     
}

module.exports = {
    getLocadorasDB, addLocadoraDB, updateLocadoraDB, deleteLocadoraDB, getLocadoraPorCodigoDB
}