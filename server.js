var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var heroes = require('./heroes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

app.route('/heroes')
	.get(function (req, res) {
		res.send(heroes.getAllHeroes());
	})
	 .post(function (req, res) {
	 	res.json({message: heroes.addHero(req.body) });
	})
	.delete(function (req, res) {
		res.json({message: heroes.deleteHeroByName(req.query.name) });
	})

app.route('/heroes/:heroId')
	.get(function(req, res){
		res.send(heroes.getHeroById(req.params.heroId));
	})
	.put(function (req, res) {
		res.json({message: heroes.updateHeroName(req.params.heroId, req.query.name) });
	})
	.delete(function (req, res) {
		res.json({message: heroes.deleteHeroById(req.params.heroId) });
	})

const httpServer = http.listen(3000, function(){
	console.log('listening on *:3000');
});

module.exports = {
	httpServer:httpServer,
	setHeroes: (newHeroes) =>{
		heroes = newHeroes;
	}
}
