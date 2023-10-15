const { pool } = require('../config');
const Filme = require('../entities/filme')

const getFilmesDB = async () => {
    try {    
        const { rows } = await pool.query(`select f.codigo as codigo, f.nome as nome, f.genero as genero, 
        f.ativo as ativo, f.valor as valor, f.locadora as locadora, l.nome as locadora_nome
        from filmes f
        join locadoras l on f.locadora = l.codigo
        order by f.codigo`);
        return rows.map((filme) => new Filme(filme.codigo, filme.nome, filme.genero, 
            filme.ativo, filme.valor, filme.locadora, filme.locadora_nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addFilmeDB = async (body) => {
    try {   
        const { nome, genero, ativo, valor, locadora } = body; 
        const results = await pool.query(`INSERT INTO filmes (nome, genero, ativo, valor, locadora) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, nome, genero, ativo, valor, locadora`,
        [nome, genero, ativo, valor, locadora]);
        const filme = results.rows[0];
        return new Filme (filme.codigo, filme.nome, filme.genero,
            filme.ativo, filme.valor, filme.locadora, "");
    } catch (err) {
        throw "Erro ao inserir o filme: " + err;
    }    
}

const updateFilmeDB = async (body) => {
    try {   
        const { codigo, nome, genero, ativo, valor, locadora }  = body; 
        const results = await pool.query(`UPDATE filmes set nome = $2 , genero = $3, 
        ativo = $4, valor = $5, locadora = $6 where codigo = $1 
        returning codigo, nome, genero, ativo, valor, locadora`,
        [codigo, nome, genero, ativo, valor, locadora]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const filme = results.rows[0];
        return new Filme(filme.codigo, filme.nome, filme.genero, 
            filme.ativo, filme.valor, filme.locadora, "");
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }      
}

const deleteFilmeDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM filmes where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Filme removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }     
}

const getFilmePorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select f.codigo as codigo, f.nome as nome, f.genero as genero, 
        f.ativo as ativo, f.valor as valor, f.locadora as locadora, l.nome as locadora_nome
        from filmes f
        join locadoras l on f.locadora = l.codigo where f.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const filme = results.rows[0];
            return new Filme(filme.codigo, filme.nome, filme.genero, 
                filme.ativo, filme.valor, filme.locadora, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o filme: " + err;
    }     
}

module.exports = {
    getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorCodigoDB
}
