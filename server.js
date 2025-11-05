const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const loginPath = require('./private/routes/login');
const cadastroPath = require('./private/routes/cadastro');
const userPath = require('./private/routes/user');
const logger =  require('./private/middlewares/logger');
const autenticar =  require('./private/middlewares/autenticacao');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/login', loginPath);
app.use('/api/cadastro', cadastroPath);
app.use('/api/users', userPath);

app.use(logger);

// parte do usuario/ paciente

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'index.html'));
});
app.get('/home/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'home.html'));
});
app.get('/home/consulta/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'consulta.html'));
});
app.get('/home/farmacia/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'medicamentos.html'));
});
app.get('/home/farmacia/eno/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'eno.html'));
});

app.get('/home/consulta/medicamento/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'prescricao.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'cadastro.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'login.html'));
});
app.get('')

// parte do médico 

app.get('/medico/consulta/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'consultaMed.html'));
});




// listen

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






