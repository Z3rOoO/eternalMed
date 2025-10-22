// async function sla() {
//     fetch('/api/user')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
// }

const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const dataNasc = document.getElementById('dataNasc').value;
    const senha = document.getElementById('senha').value;
    const conSenha = document.getElementById('confirmaSenha').value;

    const res = await fetch('http://localhost:3000/enviar', { // confirmar endereço
    method: 'POST',
    headers: { 'Content-Type': 'application/json ' },
    body: JSON.stringify({ nome, email, telefone, cpf, dataNasc, senha, conSenha})
    }) 

    const data = await res.json();
    console.log('Resposta do servidor', data)
})



