var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var pgp = require('pg-promise')( /*options*/ )
var db = pgp(DATABASE_URL);
var routes = {
    index: require('./routes/index'),
    create_account : require('./routes/create_account')
}
app.use(bodyParser.json()); // for parsing application/json
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
//app.use('/', routes.index);
app.use('/create_account', routes.create_account);

app.use(express.static(path.join(__dirname, 'public')));
// app.post('/', function(req, res, next) {
//     console.log('post request recieved')
//     console.log(req.body);
//     switch (req.body.use) {
//         case "log":
//             if (log(req.body.user)) {
//                 res.send("").status(200);
//                 res.render();
//             }
//             break;
//         case "mkuser":
//             mkuser(req.body.user);
//             break;
//         default:
//             console.log("unknown use sent by client");
//             break;
//     }
//     res.status(200).end();
//     //res.json(req.body);
// });

app.get('/', function(req, res) {
    res.render('index');
})
app.delete('/', function(req, res) {
    console.log('delete request recieved')
    res.status(200).end();
})
app.head('/', function(req, res) {
    console.log('head request recieved')
    res.status(200).end();
})
app.put('/', function(req, res) {
    console.log('put request recieved')
    res.status(200).end();
})
app.listen(3000)

function log(user) {
    db.one('SELECT password FROM users WHERE username = $1;', user.username)
        .then(function(data) {
            if (user.password == data.password) {
                return true;
            }
            return false;
        })
        .catch(function(error) {
            console.log('ERROR:', error)
        })
}

function mkuser(user) {
    db.one('SELECT EXISTS (SELECT username FROM users WHERE username = $1);', user.username)
        .then(function(data) {
            console.log(data.exists);
            if (data.exists == true) {
                return false;
            } else {
                db.none('INSERT INTO users(id, username, password) VALUES (2, $1, $2);', [user.username, user.password])
                return true;
            }
        }).catch(function(error) {
            console.log('ERROR:', error)
        })
}
