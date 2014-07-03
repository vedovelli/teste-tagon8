var express = require('express');

var app = module.exports = express();

var session = require('express-session');

var bodyParser = require('body-parser');

/* Quando o conteúdo estático passou a ser servidor pelo
express o CORS deixou de ser necessário. O código será mantido
abaixo, comentado, para futura referência.*/

// var allowCORS = function(req, res, next) {

//     res.header('Access-Control-Allow-Origin', 'http://tagon8.ved');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     next();
// }

// app.use(allowCORS);

/*app setup and startup*/
app.listen(process.env.PORT || 4730);

app.use(bodyParser.json());

app.use(session({secret: '&io9*45,'}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({

	extended: true
}));