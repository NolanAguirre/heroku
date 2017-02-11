var express = require('express');
var router = express.Router();
var db = require('../db');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});
// define the about route
router.get('/',function(req, res) {
    db.one('SELECT EXISTS (SELECT 1 FROM users WHERE username = $1);', req.body.user.username)
        .then(function(data) {
            if (data.exists){
                res.send(true).status(200);
            }else{
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
router.post('/', function(req ,res){
    db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.user.username, req.body.user.password])
        .then(function(data) {
            res.send(true).status(200);
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
module.exports = router;
