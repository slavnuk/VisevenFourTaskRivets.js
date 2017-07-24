var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', function(req,res){
    res.sendFile('index.html');
});
app.post('/savejson', function(req,res){
    fs.writeFile("data/data1.json", JSON.stringify(req.body), function(err) {
        if(err) {
            return console.log(err);
            res.send(403);
        }
        res.send(req.body);
        console.log("The file was saved!");
    });


});
app.listen(3000, function(){
    console.log('Listening on port: 3000');
});