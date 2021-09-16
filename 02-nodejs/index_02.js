/* 
    COM PROMISE
    
    0 - Obter usuário
    1 - Obter o número de telefone de usuário a partir de seu Id
    2 - Obter o endereço do usuário pelo Id
*/

//importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

const obterUsuario = () => {
    // quando der algum problema -> reject(ERRO)
    // quando der sucesso -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            //return reject(new Error('Deu ruim de verdade!'))
            return  resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

const obterTelefone = (idUsuario) => {
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11})
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 2
        })
    }, 2000)
}


const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch

usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: ${resultado.telefone.id}, ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error){
        console.error('DEU RUIM', error)
    })
