// npm install express
// npm install handlebars
// npm install consolidate

var bodyParser = require('body-parser');
var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var customerController = require('./customerController');

// Tulosta konsoliin mahdolliset enginet
//console.log(cons);

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.route('/createUser')
    .post(customerController.createUser);

app.route('/uusiLaite')
    .post(customerController.uusiLaite);

app.route('/updateUser')
    .post(customerController.updateUser);

app.route('/updateLaite')
    .post(customerController.updateLaite);


app.get('/checkUser', function (req, res) {

    var tunnus = req.param('checkUser');

    customerController.checkUser(tunnus).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null}];
            res.send(types);
            
        });


});



app.get('/poistaLaite', function (req, res) {

    var laite_id = req.param('laite_id');

    customerController.poistaLaite(laite_id).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});


app.get('/poistaVaraus', function (req, res) {

    var varaus_id = req.param('varaus_id');

    customerController.poistaVaraus(varaus_id).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});



app.get('/haeLaitteet', function (req, res) {

    //var tunnus = req.param('haeLaitteet');

    customerController.haeLaitteet().then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});


app.get('/haeKaikkiVaraukset', function (req, res) {

    //var tunnus = req.param('haeLaitteet');

    customerController.haeKaikkiVaraukset().then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});

app.get('/haeVaraukset', function (req, res) {

    var tunnus = req.param('muuttuja');

    customerController.haeVaraukset(tunnus).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});

app.get('/haeMuokattava', function (req, res) {

    var laite_id = req.param('laite_id');

    customerController.haeMuokattava(laite_id).then(function (data) {
        console.log(JSON.stringify(data));
        return data;
    })
        .then((types) => {
            return types;
        })
        .catch(function (msg) {
            console.log("Virhettä pukkaa " + msg);
        })
        .then((types) => {
            // suoritetaan vaikka tulis virhe
            if (types == null) types = [{ tunnus: null, salasana: null }];
            res.send(types);

        });


});
    

app.get('/', function(req, res) {
  res.render('login', {
    
  });
});
app.get('/register', function (req, res) {
    res.render('register', {

    });
});

app.get('/etusivu', function (req, res) {
    res.render('pääsivu', {

    });
});

app.get('/adminsivu', function (req, res) {
    res.render('adminsivu', {

    });
});

app.get('/muokkaus', function (req, res) {
    res.render('muokkaus', {

    });
});
app.get('/uusilaite', function (req, res) {
    res.render('uusilaite', {

    });
});
app.get('/laitemuokkaus', function (req, res) {
    res.render('laitemuokkaus', {

    });
});
app.get('/avaraukset', function (req, res) {
    res.render('avaraukset', {

    });
});
app.get('/varaukset', function (req, res) {
    res.render('varaukset', {

    });
});
app.get('/varaalaite', function (req, res) {
    res.render('varaalaite', {

    });
});


app.get('/users', function(req, res) {

    customerController.fetchTypesRevised().then(function(data){
        console.log("types = " + JSON.stringify(data));
        return data;    
    })
    .then((types) => {
        return types;
    })
    .catch(function(msg){
        console.log("Virhettä pukkaa " + msg);
    })
    .then((types) => {
        // suoritetaan vaikka tulis virhe
        if (types == null) types = [{ Avain: -1, Lyhenne: "KAIKKI", Selite: "Tyhyjä" }];
        //res.send(data)
        res.render('users', {
            title: 'Users',
            subtitle: 'best',
            users: users,
            languages: ['englanti', 'suomi', 'ruotsi'],
            types : types
        });        
    });
});

app.listen(3003);
console.log('Express server listening on port 3003');

