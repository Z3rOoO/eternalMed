const express = require('express')
const fs = require('fs')
const autenticar = require('../middlewares/autenticacao')
const router = express.Router()

router.get('/', autenticar, (req, res) => {
    fs.readFile('../dados/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            return
        } try {
            const dados = JSON.parse(data)
            res.status(200).json(dados)
        } catch (parseErr) {
            res.status(500).send('Erro ao traduzir o arquivo', parseErr)
        }
    })
})

router.get('/:id', autenticar, (req, res) => {
    fs.readFile('../dados/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            return
        } try {
            const dados = JSON.parse(data)
            const tarefa = dados.find(function (tar) {
                return tar.id === id
            })
            res.status(200).json(tarefa)
        } catch (parseErr) {
            res.status(500).send('Erro ao encontrar tarefa no arquivo', parseErr)
        }
    })
})

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

rrouter.put('/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id)
    const editTar = req.body

    fs.readFile('../dados/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            console.error('Ero ao ler o arquivo', err)
            return
        } try {
            const dados = JSON.parse(data)
            const index = dados.findIndex(tar => tar.id === id)
            dados[index] = {
                id, ...editTar
            }


            fs.writeFile('../dados/users.json', JSON.stringify(dados, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Erro ao adicionar o item')
                    console.error('Erro ao ler o arquivo', err)
                    return
                }
                res.status(201).send('Tarefa atualizada com sucesso!')

            })
        } catch (parseErr) {
            res.status(500).send('Erro ao encontrar tarefa no arquivo', parseErr)
        }
    })
})

router.delete('/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id)

    fs.readFile('../dados/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo')
            console.error('Erro ao ler o arquivo', err)
            return
        } try {
            const dados = JSON.parse(data)
            const index = dados.findIndex(tar => tar.id === id)

            dados.splice(index, 1)


            fs.writeFile('../dados/users.json', JSON.stringify(dados, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Erro ao adicionar o item')
                    console.error('Erro ao ler o arquivo', err)
                    return
                }
                res.status(201).send('Tarefa atualizada com sucesso!')

            })

        } catch (parseErr) {
            res.status(500).send('Erro ao encontrar tarefa no arquivo', parseErr)
        }
    })
})


module.exports = router