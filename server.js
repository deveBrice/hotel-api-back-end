let express = require('express');
const { set } = require('express/lib/application');

let server = express();

server.get('/', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
   res.status(200).send('<h1>Bienvenue sur le back office</h1>');
});

server.listen(8080, function() {
    console.log('Serveur en écoute :)');
});