// --------------------------------------------------------------------------------------------------------------------- CPF

cpf.addEventListener('input', () => { // função para validar o cpf enquanto digita
    const validarcpf = document.getElementById('validacaocpf'); //pega o id do cpf
    let valor = cpf.value.replace(/\D/g, '').slice(0, 11);
    if (valor.length < 11) { // caso o cpf tenha menos de 11 digitos
        validarcpf.innerText = `CPF deve conter 11 digitos. (${valor.length}/11)`; // mostra a mensagem de aviso
        return
    }
    else {
        validarcpf.innerText = ''; // caso tenha 11 digitos, não mostra nada
    }

    
    // formatação do cpf

    if (valor.length > 3) {  // adiciona o ponto após o terceiro dígito
        valor = valor.slice(0, 3) + '.' + valor.slice(3);
    }
    if (valor.length > 7) { // adiciona o ponto após o sexto dígito
        valor = valor.slice(0, 7) + '.' + valor.slice(7);
    }
    if (valor.length > 11) { // adiciona o hífen após o nono dígito
        valor = valor.slice(0, 11) + '-' + valor.slice(11);
    }
        cpf.value = valor;

})

// --------------------------------------------------------------------------------------------------------------------- NOME

nome.addEventListener('input', () => { // função para validar o nome enquanto digita
    const validarNome = document.getElementById('validarNome') //pega o id do nome
    const nome = document.getElementById('nome').value; //pega o valor do nome
    if(nome.length < 3){ // caso o nome tenha menos de 3 caracteres
        validarNome.innerText = 'O nome deve conter no mínimo 3 caracteres.' // mostra a mensagem de aviso
        return
    }
    else {
        validarNome.innerText = '' // caso tenha 3 digitos, não mostra nada
    }
})

// ----------------------------------------------------------------------------------------------------- telefone

tel.addEventListener('input', () => { // função para validar o telefone enquanto digita
    let telefone = tel.value.replace(/\D/g, '').slice(0, 11);   

    // formatação do telefone

    if (telefone.length > 0) {  // adiciona o parêntese de abertura
        telefone = '(' + telefone;
    }
    if (telefone.length > 3) {  // adiciona o parêntese de fechamento e espaço
        telefone = telefone.slice(0, 3) + ') ' + telefone.slice(3);
    }
    if (telefone.length > 10) { // adiciona o hífen
        telefone = telefone.slice(0, 10) + '-' + telefone.slice(10);
    }
    tel.value = telefone;
})

// --------------------------------------------------------------------------------------------------------------------- FORMULÁRIO

const form = document.getElementById('formCadastro') //pega o id do form de cadastro
form.addEventListener('submit', async (e) => { //função de submit do form
    e.preventDefault();

    const nome = document.getElementById('nome').value; //pega o valor do nome
    const email = document.getElementById('email').value; //pega o valor do email
    const tel = document.getElementById('tel').value; //pega o valor do telefone
    const cpf = document.getElementById('cpf').value; //pega o valor do cpf
    const dataNasc = document.getElementById('dataNasc').value; //pega o valor da data de nascimento
    const senha = document.getElementById('senha').value; //pega o valor da senha
    const conSenha = document.getElementById('confirmaSenha').value; //pega o valor da confirmação de senha
    const validarSenha = document.getElementById('validacaosenha'); //pega o id da validação de senha

    if (senha !== conSenha) { //verifica se a senha e a confirmação de senha são iguais
        validarSenha.innerText = 'As senhas não coincidem. Por favor, tente novamente.'; //mostra a mensagem de erro
        return;
    }

    if (nome.length < 3){
        alert('O nome deve conter no mínimo 3 caracteres.');
        return
    }
    
   if (cpf.length < 11){
        alert('CPF deve conter 11 digitos.');
        return
    }

    const res = await fetch('/api/cadastro', { // curl direto no fetch
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'bah' },
        body: JSON.stringify({ nome, email, tel, cpf, dataNasc, senha })
    })


    const data = await res.json();
    alert(data.message);
})