/* 
    COM CALLBACK

    0 - Obter usuário
    1 - Obter o número de telefone de usuário a partir de seu Id
    2 - Obter o endereço do usuário pelo Id
*/

const obterUsuario = (callback) => {
    setTimeout(() => {
        return  callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

const obterTelefone = (idUsuario, callback) => {
    setTimeout(() => {
        return callback(null, {
            telefone: '1199002',
            ddd: 11})
    }, 2000)
}

const obterEndereco = (idUsuario, callback) => {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 2
        })
    }, 2000)
}

const resolverUsuario = (erro, usuario) => {
    console.log('usuario', usuario);    
}

obterUsuario(function resolverUsuario (error, usuario) {
    // null || "" || 0 === false
    if(error){
        console.error('Deu ruim em usuario', error);
        return;
    }

    obterTelefone(usuario.id, resolverTelefone = (error1, telefone) => {
        if(error1){
            console.error('Deu ruim em usuario', error1);
            return;
        }

        obterEndereco(usuario.id, resolverEndereco = (error2, endereco) => {
            if(error2){
                console.error('Deu ruim em usuario', error2);
                return;
            }
            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
});



