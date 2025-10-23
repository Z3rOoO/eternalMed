const form = document.getElementById('formLogin');

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'bah' },
        body: JSON.stringify({ cpf, senha})
    });
    const data = await res.json();

    if (res.ok) {
        // Login bem-sucedido
        window.location.href = `/home/${data.id}`; 
    } else {
        // Falha no login
        alert(data.message || 'Falha no login. Por favor, tente novamente.');
    }
})

// ----------------------------------------------------------------------------- VALIDAÇÃO DO CPF

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

cpf.addEventListener('keypress', (e) => { // previne que o usuário possa digitar letras no campo do cpf
    const char = String.fromCharCode(e.which || e.keyCode);
    if (!/[0-9]/.test(char)) e.preventDefault();
});
