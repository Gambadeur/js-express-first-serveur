var express = require ('express');
var app = express();
var users = require ('./users.js');


// DECLARER LES ROUTES DU PLUS PRECIS AU PLUS GLOBALE

// app.get('/', function (req, res){
//     res.send('Hello World');
// });

// app.get('/about', function (req, res){
//     res.send('about');
// });

// app.get('/doudou/*', (req, res) => {
//     res.send('doudou');
//     console.log('params:', req.params )
// });

// app.get('/*', function (req, res){
//     res.send('Cette page n\'existe pas mec !');
// });



// https://github.com/simplonco/js-express-routes



app.get('/users', (req, res) => {

    const tabName = users.map(function(item){
        console.log(item.firstName);
        return item.firstName;
    });

    const tabName2 = tabName.join(", ")
    res.send(tabName2);

});

app.get('/users/:id', function (req, res){

    res.send('Bonjour ' + users[req.params.id].firstName);
});


app.get('/', (req, res) =>{
    res.send('HomePage bibou');
});



app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});