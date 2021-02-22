require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('home', {
//         nombre: 'Antonio Nieto',
//         titulo: 'Curso de Node'
//     });
// })

// app.get('/generic', (req, res) => {
//     res.render('generic', {
//         nombre: 'Antonio Nieto',
//         titulo: 'Curso de Node'
//     });
// });

// app.get('/elements', (req, res) => {
//     res.render('elements', {
//         nombre: 'Antonio Nieto',
//         titulo: 'Curso de Node'
//     });
// });

// __dirname: toma la ruta donde se está corriendo el proyecto
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})