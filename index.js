//Express APP
var express = require('express')
var app = express()
var port = process.env.PORT || 3000;

//Auth
var auth = require('http-auth');
var basic = auth.basic({
  realm: "Simon Area.",
  file: __dirname + "/data/users.htpasswd"
});

//Scribe LOGS
var scribe = require('scribe-js')();
var console = process.console;

var cool = require('cool-ascii-faces');
var bodyParser = require('body-parser');

app.use(auth.connect(basic));
app.use('/logs', scribe.webPanel());
app.use(scribe.express.logger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all('/v1/sample', function (req, res, next) {
  var resBody = JSON.stringify(req.body, null, 2);
  var messageId = req.get('messageId');

  console.log(new Date().toISOString(), ' - messageId: ', messageId);
  console.log('Receiving: ', resBody);
  next();
});

app.post('/v1/sample', function (req, res) {
  res.status(200).type("json").json('{messageId: ' + req.get('messageId') + '}');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(port, function(){
  console.log('listening on *:', port);
});
