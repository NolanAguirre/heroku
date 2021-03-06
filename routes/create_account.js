var express = require('express');
var router = express.Router();
var db = require('../db');
router.use(function timeLog(req, res, next) {
    next();
});
router.put('/', function(req, res) {
    db.one('SELECT EXISTS (SELECT 1 FROM users WHERE username = $1);', req.body.user.username)
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
router.post('/', function(req, res) {
    db.none('CREATE TABLE ' + req.body.user.username + ' (username text, message text[10], proirity integer[10])')
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
    db.none('INSERT INTO users (username, password, name) VALUES ($1, $2, $3);', [req.body.user.username, req.body.user.password, req.body.user.name])
        .then(function(data) {
            res.send(true).status(200);
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
module.exports = router;
