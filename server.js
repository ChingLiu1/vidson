var express,hbs,port;

express = require('express');

var app = express();
hbs = require('hbs');
port = 3000 || process.env.PORT;

app.use(express.static('public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', 'views');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    
    res.render('index');
    
});

app.get('/services', (req, res) => {
    res.render('services.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs');
});

app.listen(port, () => {
    console.log('listenning locally');
});