var express = require ('express');
var app = express();
const users = require ('./users.js');
const project = require ('./project.js');
const bodyParser = require('body-parser');
const morgan = require ('morgan');
const pg = require('pg');
const urlBdd = 'postgres://@localhost/db_firstserver';
const urlBdd2 = 'postgres://@localhost/base1';


//Bodyparser pour récupérer la donnée dans la BDD

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Express static pour rendre les fichiers statiques (HTML,JS, CSS files et images)
app.use(express.static(__dirname + '/public'));
//Now, Inside you server.js set the view Engine to ejs as follows
app.set('view engine', 'ejs');

// https://github.com/simplonco/js-express-routes

// Morgan, c'est une fonction middleware (permet de calculer le temps de reponse pour chaque requete)

app.use(morgan('dev'));

// FONCTIONS MIDDLEWARE

var myLogger = function (req, res, next){
    console.log('LOGGED');
    next();
};

app.use(myLogger);

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    console.log('testdfdg');
    next();
};

app.use(requestTime);

app.get('/projects', (req, res) => {
res.render('pages/projects.ejs', {project});
});

// Connection POST à postgresql => pour insérer des données dans la BDD

app.post('/users', function (req, res, next){
   
    pg.connect(urlBdd2, function(err, client, done){
        // Insert Data
        client.query('INSERT INTO users (firstname, lastname) VALUES ($1, $2);',
        [req.body.firstName, req.body.lastName], function(err, result){
            done()
            //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
            res.send("addok")
        })
    })
})

app.get('/tab', function(req, res){
    pg.connect(urlBdd2, function(err, client, done){
        client.query('SELECT firstName FROM users;', [], function (err, result){
            done()
            res.json(result.rows)
            
        })
        //res.render('pages/tab.ejs')
    })
    
})


// ROUTES EXPRESS

app.get('/projects/:id', (req, res) => {
    const userproject = project.find( (item) => {
        return item.userId === Number(req.params.id)
    })

    if (userproject){
        res.render('pages/userproject.ejs', {userproject})
    }

    else {
        res.send('cette page n\'existe pas')
    }

});

// app.get('/projects/:id', (req, res) => {

//   const projectUser = project.find( (item) => {
//         return item.id === Number(req.params.id)
//     })

//     if (projectUser){
//         res.send(JSON.stringify(projectUser.age))
//     }

//     else {
//         res.send('cette page n\'existe pas')
//     }

// });


app.get('/users', (req, res) => {
    const TabName = users.map((item) =>{
        return item.firstName
    })
    const TabName2 = TabName.join(', ')

    res.render('pages/users.ejs', {TabName2});
});


app.get('/users/:id', (req, res) =>{
    const user = users.find( (item) => {
        return item.id === Number(req.params.id)
    })

    if (user){
        res.send(user.firstName)
    }

    else {
        res.send('cette page n\'existe pas')
    }
    // res.send(users[req.params.id].firstName);
});


app.get('/', (req, res) =>{
    res.render('./pages/index', {username:'Mathieu', title:'accueil'});
     console.log(req.requestTime);
});



app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});