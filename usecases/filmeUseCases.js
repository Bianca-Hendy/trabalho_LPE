// Importa o pool de conexão com o banco de dados e a classe Filme
const { pool } = require('../config');
const Filme = require('../entities/filme')

// Função para obter todos os filmes da base de dados
const getFilmesDB = async () => {
    try {
        // Realiza uma consulta SQL para selecionar informações sobre filmes e suas locadoras
        const { rows } = await pool.query(`select f.codigo as codigo, f.nome as nome, f.genero as genero, 
        f.ativo as ativo, f.valor as valor, f.locadora as locadora, l.nome as locadora_nome
        from filmes f
        join locadoras l on f.locadora = l.codigo
        order by f.codigo`);
        
        // Mapeia os resultados da consulta para objetos da classe Filme e os retorna
        return rows.map((filme) => new Filme(filme.codigo, filme.nome, filme.genero, 
            filme.ativo, filme.valor, filme.locadora, filme.locadora_nome));
    } catch (err) {
        // Em caso de erro, lança uma exceção com uma mensagem
        throw "Erro : " + err;
    }
}

// Função para adicionar um novo filme à base de dados
const addFilmeDB = async (body) => {
    try {   
        // Extrai informações do corpo da requisição
        const { nome, genero, ativo, valor, locadora } = body; 
        
        // Executa uma consulta SQL para inserir um novo filme na base de dados
        const results = await pool.query(`INSERT INTO filmes (nome, genero, ativo, valor, locadora) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, nome, genero, ativo, valor, locadora`,
        [nome, genero, ativo, valor, locadora]);
        
        // Recupera o primeiro filme inserido e o retorna como um objeto Filme
        const filme = results.rows[0];
        return new Filme (filme.codigo, filme.nome, filme.genero,
            filme.ativo, filme.valor, filme.locadora, "");
    } catch (err) {
        // Em caso de erro, lança uma exceção com uma mensagem
        throw "Erro ao inserir o filme: " + err;
    }    
}

// Função para atualizar um filme existente na base de dados
const updateFilmeDB = async (body) => {
    try {   
        // Extrai informações do corpo da requisição
        const { codigo, nome, genero, ativo, valor, locadora }  = body; 
        
        // Executa uma consulta SQL para atualizar as informações do filme
        const results = await pool.query(`UPDATE filmes set nome = $2 , genero = $3, 
        ativo = $4, valor = $5, locadora = $6 where codigo = $1 
        returning codigo, nome, genero, ativo, valor, locadora`,
        [codigo, nome, genero, ativo, valor, locadora]);        
        
        // Verifica se algum registro foi atualizado
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        
        // Recupera o filme atualizado e o retorna como um objeto Filme
        const filme = results.rows[0];
        return new Filme(filme.codigo, filme.nome, filme.genero, 
            filme.ativo, filme.valor, filme.locadora, "");
    } catch (err) {
        // Em caso de erro, lança uma exceção com uma mensagem
        throw "Erro ao alterar o produto: " + err;
    }      
}

// Função para excluir um filme da base de dados por código
const deleteFilmeDB = async (codigo) => {
    try {           
        // Executa uma consulta SQL para excluir um filme pelo seu código
        const results = await pool.query(`DELETE FROM filmes where codigo = $1`,
        [codigo]);
        
        // Verifica se algum registro foi excluído
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            // Retorna uma mensagem de sucesso
            return "Filme removido com sucesso";
        }       
    } catch (err) {
        // Em caso de erro, lança uma exceção com uma mensagem
        throw "Erro ao remover o produto: " + err;
    }     
}

// Função para buscar um filme na base de dados pelo seu código
const getFilmePorCodigoDB = async (codigo) => {
    try {           
        // Executa uma consulta SQL para selecionar informações sobre um filme e sua locadora com base no código
        const results = await pool.query(`select f.codigo as codigo, f.nome as nome, f.genero as genero, 
        f.ativo as ativo, f.valor as valor, f.locadora as locadora, l.nome as locadora_nome
        from filmes f
        join locadoras l on f.locadora = l.codigo where f.codigo = $1`,
        [codigo]);
        
        // Verifica se algum registro foi encontrado
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            // Recupera o filme encontrado e o retorna como um objeto Filme
            const filme = results.rows[0];
            return new Filme(filme.codigo, filme.nome, filme.genero, 
                filme.ativo, filme.valor, filme.locadora, "");
        }       
    } catch (err) {
        // Em caso de erro, lança uma exceção com uma mensagem
        throw "Erro ao recuperar o filme: " + err;
    }     
}

// Exporta todas as funções para serem usadas em outras partes do aplicativo
module.exports = {
    getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorCodigoDB
}
