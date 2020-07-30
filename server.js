var express = require('express');
var tmi = require('tmi.js');
var app = express();
var port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
    res.render('index');
});

app.listen(port, function() {
    console.log(`Hosting on ${port}`);
})

const client = new tmi.Client({
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [ 'thylacineFGC' ]
});

client.connect();


client.on('message', (channel, tags, message, self) => {
    if (self) return true;
    const { username } = tags;
    
    console.log(username);
	console.log(`${tags['display-name']}: ${message}`);
});
		