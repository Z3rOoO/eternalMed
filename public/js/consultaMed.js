const form = document.getElementById('formMed')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const userID = document.getElementById("idUser").value
    const remedio = document.getElementById("remedio").value
    const instrucoes = document.getElementById('instrucoes').value

    const res = await fetch(`/api/users/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bah'
        },
        body: JSON.stringify({
            prescricao: [{
                medico: "não identificado",
                titulo: remedio,
                descricao: instrucoes
            }]
        })
    })


    if (res.ok) {
        fetch(`/api/users/${userID}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bah'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(`medicamento enviado ao paciente: ${data.nome}`)
    })


}
})



