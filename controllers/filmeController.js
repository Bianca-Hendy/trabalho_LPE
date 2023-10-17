// Importa funções do módulo filmeUseCases para interagir com a base de dados
const { getFilmesDB, addFilmeDB, updateFilmeDB, deleteFilmeDB, getFilmePorCodigoDB } = require('../usecases/filmeUseCases')

// Função para buscar todos os filmes
const getFilmes = async (request, response) => {
    try {
        // Chama a função para obter todos os filmes da base de dados
        const data = await getFilmesDB();
        // Responde com um status 200 (OK) e os dados em formato JSON
        response.status(200).json(data);
    } catch (err) {
        // Em caso de erro, responde com um status 400 (Bad Request) e uma mensagem de erro
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os filmes: ' + err
        });
    }
}

// Função para adicionar um novo filme
const addFilme = async (request, response) => {
    try {
        // Chama a função para adicionar um novo filme à base de dados, usando os dados do corpo da requisição (request.body)
        const data = await addFilmeDB(request.body);
        // Responde com um status 200 (OK), uma mensagem de sucesso e os dados do filme criado
        response.status(200).json({
            status: "success",
            message: "Filme criado",
            objeto: data
        });
    } catch (err) {
        // Em caso de erro, responde com um status 400 (Bad Request) e uma mensagem de erro
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
}

// Função para atualizar um filme existente
const updateFilme = async (request, response) => {
    try {
        // Chama a função para atualizar um filme na base de dados, usando os dados do corpo da requisição (request.body)
        const data = await updateFilmeDB(request.body);
        // Responde com um status 200 (OK), uma mensagem de sucesso e os dados do filme atualizado
        response.status(200).json({
            status: "success",
            message: "Filme alterado",
            objeto: data
        });
    } catch (err) {
        // Em caso de erro, responde com um status 400 (Bad Request) e uma mensagem de erro
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
}

// Função para excluir um filme por código
const deleteFilme = async (request, response) => {
    try {
        // Converte o código de filme a ser excluído a partir dos parâmetros da requisição (request.params.codigo) para um número inteiro
        const codigoFilme = parseInt(request.params.codigo);
        // Chama a função para excluir o filme da base de dados
        const data = await deleteFilmeDB(codigoFilme);
        // Responde com um status 200 (OK), uma mensagem de sucesso e dados da operação de exclusão
        response.status(200).json({
            status: "success",
            message: data
        });
    } catch (err) {
        // Em caso de erro, responde com um status 400 (Bad Request) e uma mensagem de erro
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
}

// Função para buscar um filme por código
const getFilmePorCodigo = async (request, response) => {
    try {
        // Converte o código de filme a ser buscado a partir dos parâmetros da requisição (request.params.codigo) para um número inteiro
        const codigoFilme = parseInt(request.params.codigo);
        // Chama a função para buscar um filme por código na base de dados
        const data = await getFilmePorCodigoDB(codigoFilme);
        // Responde com um status 200 (OK) e os dados do filme encontrado
        response.status(200).json(data);
    } catch (err) {
        // Em caso de erro, responde com um status 400 (Bad Request) e uma mensagem de erro
        response.status(400).json({
            status: 'error',
            message: err
        });
    }
}

// Exporta todas as funções para serem usadas em outras partes do aplicativo
module.exports = {
   getFilmes, addFilme, updateFilme, deleteFilme, getFilmePorCodigo
}
