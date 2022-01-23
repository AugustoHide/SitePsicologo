const express = require('express');
const app = express();

const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const ejsMate = require('ejs-mate');
const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '/views');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});

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

app.get('/robots.txt', (req, res) => {
    res.sendFile('robots.txt');
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile('sitemap.xml');
});

app.all('*', (req, res) => {
    const pagina = 'Página Não Encontrada';
    res.render('notFound', { pagina });
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});