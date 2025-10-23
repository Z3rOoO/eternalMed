const express = require('express')
const fs = require('fs')
const autenticar = require('../middlewares/autenticacao')
const router = express.Router()

router.post('/', autenticar, (req, res) => {

    fs.readFile('./private/data/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao ler o arquivo de usuários.' })
            return
        } try {
            const senha = req.body.senha
            const cpf = req.body.cpf
            const users = JSON.parse(data)
            if (users.some(user => user.cpf === cpf && user.senha === senha)) {
                const user = users.find(user => user.cpf === cpf)
                return res.status(200).json({ message: 'Login realizado com sucesso!',
                    id: user.id})
            } else if (users.some(user => user.cpf === cpf && user.senha !== senha)) {
                return res.status(401).json({ message: 'Senha incorreta. Por favor, tente novamente.' })    

            } else if (users.some(user => user.cpf !== cpf)) {
                    return res.status(404).json({ message: 'CPF não encontrado. Por favor, verifique e tente novamente.' })
                }
    } catch (parseErr) {
            res.status(500).json({ message: 'Erro ao processar os dados de usuários.', parseErr })
        }
    })
})

module.exports = router