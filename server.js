const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

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