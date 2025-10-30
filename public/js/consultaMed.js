const res = fetch('/api/users/', { // le todo os usuários da array
    method: 'GET',
    headers: { 'Authorization': 'bah' }
})
    .then(res => res.json())
    .then(data => {

        const nomeDosPacientes = document.getElementById('nomeDosPacientes') // id do select do html (consultaMed)
        const idDoMed = window.location.pathname.split('/').pop()

        // 000000000000000000000000000000000000000
        
        const nomeDoMed = fetch(`/api/users/${idDoMed}`, {
            method: 'GET',
            headers: { 'Authorization': 'bah' }

        }).then(response => response.json())
            .then(data => {
                document.getElementById('nomeMed').innerHTML = `${data.nome}`
            })
        
        console.log(nomeDoMed)
        // 000000000000000000000000000000000000000
        for (const key in data) {
            if (data[key].id != idDoMed) { // faz com que nas opções dos pacientes, não apareça o nome do próprio médico.
                const option = new Option(data[key].nome, data[key].id)
                nomeDosPacientes.options[nomeDosPacientes.options.length] = option
            }
        }

        nomeDosPacientes.addEventListener('change', function () {

            const form = document.getElementById('formMed')
            form.addEventListener('submit', async (e) => {
                e.preventDefault()



                const nomeDoMed = await fetch(`/api/users/${idDoMed}`, {
                    method: 'GET',
                    headers: { 'Authorization': 'bah' }

                }).then(response => response.json())
                    .then(data => {
                        return data.nome
                    })

                const userID = this.value
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
                            medico: nomeDoMed,
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

        })
    })







