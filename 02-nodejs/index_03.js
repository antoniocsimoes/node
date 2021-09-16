/* 
    COM ASYNC/AWAIT

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


// 10 passo adcionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main(){
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: ${telefone.ddd}, ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

