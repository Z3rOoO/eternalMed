const userID = window.location.pathname.split('/').pop() // pega apenas o id do usuário puxando direto do url da página


fetch(`/api/users/${userID}`, { // busca o id na api
  method: 'GET',
  headers: { 'Authorization': 'bah' }
})
  .then(response => response.json(), 
)
  .then(data => {
    console.log('Dados do usuario:', data)
    document.getElementById('nomePerfil').innerHTML = data.nome
  })


  function consulta() {
    window.location.href = `/home/consulta/${userID}`
  }