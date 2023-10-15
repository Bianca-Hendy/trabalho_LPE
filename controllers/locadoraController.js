const { getLocadorasDB, addLocadoraDB, 
    updateLocadoraDB, deleteLocadoraDB, getLocadoraPorCodigoDB } 
    = require('../usecases/locadoraUseCases')

const getLocadoras = async (request, response) => {
    // capturando o usuario que foi enviado pelo next do verificaJWT
    console.log('Usuario no getLocadora' + 
    JSON.stringify(request.usuario));
    await getLocadorasDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar locadora: ' + err
          }))
}

const addLocadora = async (request, response) => {
    await addLocadoraDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Locadora criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateLocadora = async (request, response) => {
    await updateLocadoraDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Locadora alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteLocadora = async (request, response) => {
    await deleteLocadoraDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getLocadoraPorCodigo= async (request, response) => {
    await getLocadoraPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getLocadoras, addLocadora, updateLocadora, deleteLocadora, getLocadoraPorCodigo
}