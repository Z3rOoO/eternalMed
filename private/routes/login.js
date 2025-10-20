const express = require('express')
const fs = require('fs')
const autenticar = require('../middlewares/autenticacao')
const router = express.Router()

router.post('/', autenticar, (req, res) => {
    const novaTar = req.body
    fs.readFile('../dados/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            return
        } try {
            const dados = JSON.parse(data)
            dados.push(novaTar)
            fs.writeFile('../dados/users.json', JSON.stringify(dados, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Erro ao adicionar o item')
                    return
                } try {
                    res.status(200).send('Nova tarefa adicionada com sucesso!')
                } catch (parseErr) {
                    res.status(500).send('Erro ao adicionar a tarefa', parseErr)
                }
            })
        } catch (parseErr) {
            res.status(500).send('Erro ao traduzir o arquivo', parseErr)
        }
    })
})

module.exports = router