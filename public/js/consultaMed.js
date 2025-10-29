const res = fetch('/api/users/', {
    method: 'GET',
    headers: { 'Authorization': 'bah' }
})
    .then(res => res.json())
    .then(data => {

        const nomeDosPacientes = document.getElementById('nomeDosPacientes')


        for (const key in data) {
            const option = new Option(data[key].nome, data[key].id)
            nomeDosPacientes.options[nomeDosPacientes.options.length] = option
        }

        nomeDosPacientes.addEventListener('change', function () {

            const form = document.getElementById('formMed')
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const idDoMed = window.location.pathname.split('/').pop()
                console.log(idDoMed)

                // const nomeDoMed = fetch(`api/users/${idDoMed}`, {
                //     headers: {'Authorization':'bah'}
                // }.then(res => res.json()) 
                // .then(data =>{
                //     console.log(data.id)
                // })
                // )
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
                            medico: 'aaaa',
                            titulo: remedio,
                            descricao: instrucoes
                        }]
                    })
                })

                console.log()
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







