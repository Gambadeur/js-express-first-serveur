var express = require ('express');
var app = express();


// DECLARER LES ROUTES DU PLUS PRECIS AU PLUS GLOBALE

app.get('/', function (req, res){
    res.send('Hello World');
});

app.get('/about', function (req, res){
    res.send('about');
});

app.get('/doudou/*', (req, res) => {
    res.send('doudou');
    console.log('params:', req.params )
});

app.get('/*', function (req, res){
    res.send('Cette page n\'existe pas mec !');
});


app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});