const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const loginPath = require('./private/routes/login');
const cadastroPath = require('./private/routes/cadastro');
const userPath = require('./private/routes/user');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/login', loginPath);
app.use('/api/cadastro', cadastroPath);
app.use('/api/users', userPath);

app.post('/enviar', (req, res) => {
  const { nome, email, tel, cpf, dataNasc, senha, conSenha } = req.body;
  console.log('Dados recebidos:', nome, email, tel, copyFile, dataNasc, senha, conSenha);

  // Aqui você pode salvar no banco, validar, etc.
  res.json({ mensagem: 'Dados recebidos com sucesso!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'home.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'login.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






