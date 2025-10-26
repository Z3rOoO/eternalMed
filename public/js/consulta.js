userID = window.location.pathname.split('/').pop()

console.log('esse é o id:', userID)

fetch(`/api/users/${userID}`, {
    headers: {'Authorization': 'bah'}
})
    .then(response => response.json())
    .then(data => {
        console.log(data.prescricao[0].medico)
        if (data.prescricao[0].titulo === null && data.prescricao[0].descricao === null && data.prescricao[0].medico === null){
            document.getElementById('medicoConsultaCard').style.display = 'none'
        }
        else {
            document.getElementById('medicoConsulta').innerHTML = `Médico(a) : ${data.prescricao[0].medico}`
            document.getElementById('medicoConsultaLink').href = '/cadastro'
        }
    })

