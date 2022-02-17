let express = require('express');
let bodyParser = require('body-parser');
let apiRouter = require('./apiRouter').router;

let server = express();

server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

server.get('/', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
   res.status(200).send('<h1>Bienvenue sur le back office</h1>');
});

server.use('/api/', apiRouter)

server.listen(8080, function() {
    console.log('Serveur en écoute :)');
});