const mongoSanitize = require('express-mongo-sanitize');
const express = require('express');
const app = express();

const ejsMate = require('ejs-mate');
const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '/views');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());


app.get('/', (req, res) => {
    const pagina = 'Home';
    res.render('paginaInicial', { pagina });
});

app.get('/depressao', (req, res) => {
    const pagina = 'Transtorno Depressivo';
    res.render('depressao', { pagina });
});

app.get('/orientacaoProfissional', (req, res) => {
    const pagina = 'Orientação Profissional';
    res.render('orientacaoProfissional', { pagina });
});

app.get('/tcc', (req, res) => {
    const pagina = 'Terapia Coginitivo-Comportamental';
    res.render('tcc', { pagina });
});

app.get('/sobreMim', (req, res) => {
    const pagina = 'Sobre Mim';
    res.render('sobreMim', { pagina });
});

app.get('/contato', (req, res) => {
    const pagina = 'Contatos';
    res.render('contato', { pagina });
});

app.get('/logo', (req, res) => {
    const pagina = 'Logo';
    res.render('logo', { pagina });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});