userID = window.location.pathname.split('/').pop()

console.log('esse é o id:', userID)

fetch(`/api/users/${userID}`, {
    headers: {'Authorization': 'bah'}
})
    .then(response => response.json())
    .then(data => {
        if (data.prescricao === null){
            document.getElementById('medicoConsultaCard').style.display = 'none'
        }
        else {
            document.getElementById('medicoConsulta').innerHTML = data.prescricao
            document.getElementById('medicoConsultaLink').href = '/cadastro'
        }
    })

