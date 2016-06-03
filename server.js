var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.text({type:"*/*"}));


port = 1500;
//var sensors = {};
counter = 0;
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(port);
console.log('listening on port', port)

var bots = {};

function makeBot(x,y,h){
	mybot = {}
	mybot.x = x;
	mybot.y = y;
	mybot.h = h;
	return mybot;
}

// bots.push(makeBot(1,2,3));
// bots.push(makeBot(4,5,6));
bots['bob'] = makeBot(20,40,90);
bots['lois'] = makeBot(50,70,180);
bots['gary'] = makeBot(90,110,270);
console.log(bots)
//robotData

app.all('/all', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(bots);
    res.send(JSON.stringify(bots));
});

app.all('/getpose', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(bots));
});

app.all('/setpose', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    //bots.gary.x = JSON.parse(req.body).x;
    //bots.gary.y = JSON.parse(req.body).y;
    //bots.gary.h = JSON.parse(req.body).h;
    res.send();
});

var wss = new WebSocketServer({ server: server });
wss.on('connection', function(ws) {
    var id = setInterval(function() {
        ws.send(JSON.stringify(bots), function() { /* ignore errors */ });
    }, 500);
    console.log('connection to client');
    ws.on('close', function() {
        console.log('closing client');
        clearInterval(id);
    });
});