var cool = require('cool-ascii-faces');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = 3000

app.set('port', (process.env.PORT || port));

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

app.listen(port, function () {
  console.log('Listening on port ', port)
});

