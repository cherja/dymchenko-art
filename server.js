var express = require("express");
var app = express();
var path = require("path");
var exec = require('child_process').exec;
var port = 8080;

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/deploy', function(req, res) {
  exec('git pull', function(error, stdout, stderr) {
    if (error) res.send(stdout);
    exec('npm i --no-option', function(error, stdout, stderr) {
      if (error) res.send(stdout);
      exec('npm run build', function(error, stdout, stderr) {
        error ? res.send(stdout) : res.send("OK");
      });
    });
  });
});

app.listen(port);

console.log("Running at Port " + port);
