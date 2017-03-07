var express = require('express');
var router = express.Router();
var db = require('../db');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});
// define the about route
router.post('/', function(req, res) {
    db.one('SELECT 1 FROM users WHERE username =  $1', req.body.friend)
        .then(function(data) {
            res.json({
                username: data.username,
                name: "dave",
                profilePicture: ""
            });
        })

        .catch(function(error) {
            console.log('ERROR:' + error);
        })
})
router.put('/', function(req, res) {
    db.none('INSERT INTO ' + req.body.user.username + '(username, message[10], proirity[10] VALUES $1, NULL, NULL);', req.body.friend)
        .then(function(data) {
            if (data.exists) {
                res.send(true).status(200);
            } else {
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
