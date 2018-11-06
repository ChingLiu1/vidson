var express,hbs,port,nodemailer,bodyParser;

express = require('express');
nodemailer = require('nodemailer');
bodyParser = require('body-parser');

var app = express();
hbs = require('hbs');
port = 3000 || process.env.PORT;

app.use(express.static('public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', 'views');
app.set('view engine', 'hbs');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

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

app.post('/schedule', (req, res) => {
   var output = `
        <h1>${req.body.username}</h1>
        <h3>${req.body.email}</h3>
        <p>${req.body.message}<p>
`;
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 's7dzpnftfbxpolii@ethereal.email',
            pass: '9CCQndxDs8xAtbRM1N'
        }
        
    });
    
    transporter.sendMail({
        from: '"Fred Foo " <s7dzpnftfbxpolii@ethereal.email>',
        to : "chingliu12@gmail.com",
        subject : req.body.username,
        html : output,
    },(err, info) => {
        if (err) {
            res.render('contact', {
                failed : "smtp server is down"
            });
        }else{
            res.render('contact',{
                success : "message sent"
            });
        }
    });
    
});



app.listen(port, () => {
    console.log('listenning locally');
});