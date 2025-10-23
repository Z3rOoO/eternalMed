const express = require('express')
const fs = require('fs')
const autenticar = require('../middlewares/autenticacao')
const router = express.Router()

router.post('/', autenticar, (req, res) => {
    const novaTar = req.body
    console.log(novaTar)

    fs.readFile('./private/data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            return
        } try {
            const dados = JSON.parse(data)
            const cpf = req.body.cpf
            const email = req.body.email
            const tel = req.body.tel
            

            if (dados.some(user => user.cpf === cpf)) {
                return res.status(400).json({ message: 'esse CPF já está cadastrado no sistema. Por favor, utilize outro CPF.' })
            }
            else if (dados.some(user => user.email === email)) {
                return res.status(400).json({ message: 'esse Email já está cadastrado no sistema. Por favor, utilize outro Email.' })
            }
            else if (dados.some(user => user.tel === tel)) {
                return res.status(400).json({ message: 'esse número já está cadastrado no sistema. Por favor, utilize outro número de telefone.' })
            }
            else {
                try {
                    const dados = JSON.parse(data)
                    dados.push(novaTar)
                    fs.writeFile('./private/data/users.json', JSON.stringify(dados, null, 2), (err) => {
                        if (err) {
                            res.status(500).send('Erro ao adicionar o item')
                            return
                        } try {
                            return res.status(201).json({ message: 'Cadastro realizado com sucesso!' })
                        } catch (parseErr) {
                            res.status(500).send('Erro ao adicionar a tarefa', parseErr)
                        }
                    })
                } catch (parseErr) {
                    res.status(500).json('Erro ao traduzir o arquivo', parseErr)
                }
            }
        } catch (parseErr) {
            res.status(500).json('Erro ao traduzir o arquivo', parseErr)
        }

    })
})


module.exports = router