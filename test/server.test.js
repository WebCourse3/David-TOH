const chai = require('chai'),
	chaiHttp = require('chai-http'),
	mocha = require('mocha'),
	sinon = require('sinon'),
	server = require('../server');
	httpServer = server.httpServer;
	assert = chai.assert;

chai.should();
chai.use(chaiHttp);

describe('server tests', () => {
	describe('/heroes get', () => {
		it('should get all the heroes', (done) => {
			const heroesStub = {};
			heroesStub.getAllHeroes = sinon.stub();
			heroesStub.getAllHeroes.withArgs().returns(new Array(4));
			server.setHeroes(heroesStub);
			chai.request(httpServer)
				.get('/heroes')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(4);
					done();
				});
		});
	});

	describe('/heroes post', () => {
		it('it should post a hero', (done) => {
			let newHero = { "id":0,"name":"Joshua" };
			const heroesStub = {};
			heroesStub.addHero = sinon.stub();
			heroesStub.addHero.withArgs(newHero).returns('Hero added successfully');
			server.setHeroes(heroesStub);
			chai.request(httpServer)
				.post('/heroes')
				.send(newHero)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Hero added successfully');
					done();
				});
		});
	});

	describe('/heroes delete', () => {
		it('it should delete a hero', (done) => {
			let heroToDelete = 'Zero';
			const heroesStub = {};
			heroesStub.deleteHeroByName = sinon.stub();
			heroesStub.deleteHeroByName.withArgs(heroToDelete).returns('Hero deleted successfully!');
			server.setHeroes(heroesStub);
			chai.request(httpServer)
				.delete('/heroes')
				.query({name: heroToDelete})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Hero deleted successfully!');
					done();
				});
		});
	});
	// describe('/heroes/:heroId get', () => {
	// 	it('should get a hero by id', (done) => {
	// 		let heroIdToGet = 0;
	// 		const heroesStub = {};
	// 		heroesStub.getHeroById = sinon.stub();
	// 		heroesStub.getHeroById.withArgs(heroIdToGet).returns('Hero deleted successfully!');
	// 		server.setHeroes(heroesStub);
	// 		chai.request(httpServer)
	// 			.get('/heroes/' + heroIdToGet.toString())
	// 			.query({name: heroToDelete})
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message').eql('Hero deleted successfully!');
	// 				done();
	// 			});
	// 	});
	// });

	after(() => httpServer.close());
});
