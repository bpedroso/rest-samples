var express = require('express')
var exp = express()
var bodyParser = require('body-parser')
var port = 3000

exp.use(bodyParser.urlencoded({ extended: true }));
exp.use(bodyParser.json());

exp.all('/v1/sample', function (req, res, next) {
  var resBody = JSON.stringify(req.body, null, 2);
  var messageId = req.get('messageId');

  console.log(new Date().toISOString(), ' - messageId: ', messageId);
  console.log('Receiving: ', resBody);
  next();
});

exp.post('/v1/sample', function (req, res) {
  res.status(200).type("json").json('{messageId: ' + req.get('messageId') + '}');
});

exp.listen(port, function () {
  console.log('Example app listening on port ', port)
});

