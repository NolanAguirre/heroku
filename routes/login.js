var express = require('express');
var router = express.Router();
var db = require('../db')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("request sent to /login")
  next();
});
// define the about route
router.put('/', function(req ,res){
    db.one('SELECT password FROM users WHERE username =  $1', req.body.user.username)
        .then(function(data) {
            if (data == req.body.user.password){
                res.send(true).status(200);
            }else{
                res.send(false).status(200);
            }
        })
        .catch(function(error) {
            console.log('ERROR:' + error)
        })
})
module.exports = router;
