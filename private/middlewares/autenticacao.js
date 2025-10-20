function autenticar(req, res, next) {
    const token = req.headers['authorization']
    if (token === 'bah') {
        next()
    } else {
        res.status(401).send('não autorizado')
    }
}

module.exports = autenticar