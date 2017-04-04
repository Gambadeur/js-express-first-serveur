var express = require ('express');
var app = express();
const users = require ('./users.js');

// https://github.com/simplonco/js-express-routes


app.get('/users', (req, res) =>{

    const TabName = users.map((item) =>{
        return item.firstName
    })

    const TabName2 = TabName.join(', ')

    res.send(TabName2);
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
    res.send('HomePage');
});



app.listen(5000, function(){
    console.log('Example app listening on port 5000!');
});