userID = window.location.pathname.split('/').pop()

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
            document.getElementById('medicamentoP').innerHTML = `${data.prescricao[0].titulo}`
            document.getElementById('instrucoes').innerHTML = `${data.prescricao[0].descricao}`
        }
    })

