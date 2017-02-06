var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var routes = {
    index: require('./routes/index'),
    create_account : require('./routes/create_account')
}
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json()); // for parsing application/json
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/create_account', routes.create_account);
app.get('/', routes.index.index);
app.listen(app.get('port'));
