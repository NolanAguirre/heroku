var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')( /*options*/ )
pgp.pg.defaults.ssl = true;
var db = pgp(process.env.DATABASE_URL);
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});
// define the about route
router.put('/',function(req, res) {
    console.log(req.body);
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
    console.log(req.body);
    db.none('INSERT INTO users (id, username, password) VALUES ($1, $2, $3)', [2, req.body.user.username, req.body.user.password])
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
module.exports = router;
