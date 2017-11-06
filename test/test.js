var database = require('../database');
var heroes = require('../heroes');
var assert = require('assert');

describe('Heroes', function() {
	describe('#getAllHeroes()', function() {
		it('Should return all heroes.', function() {
			assert.equal(database.heroes, heroes.getAllHeroes());
		});
	});

	describe('#getHeroById()', function() {
		it('Should return hero if present', function() {
			assert.equal(database.heroes.find(hero => hero.id == 11),
				         heroes.getHeroById(11));
		});

		it('Should return an error when hero not present', function() {
			assert.equal('There is no hero with that id!',
				heroes.getHeroById(404));
		});
	});

	describe('#addHero()', function() {
		it('Should add the new hero', function() {
			var newHero = { "id":40,"name":"joshua" };
			heroes.addHero(newHero);
			assert.equal(heroes.heroes[heroes.heroes.length -1], newHero);
		});

		it('Should return an error when hero exists', function() {
			var newHero = { "id":0,"name":"Zero" };
			assert.equal('A hero with that id already exists!',
				         heroes.addHero(newHero));
		});

		it('Should return an error when id is not a number', function () {
			var newHero = { "id":"string","name":"Zero" };
			assert.equal('Thats an elegal id!',
						 heroes.addHero(newHero));
		});
	});

	describe('#updateHeroName()', function() {
		it('Should update the hero name', function() {
			var name = 'One';
			heroes.updateHeroName(0,name);
			assert.equal(heroes.heroes.find(x=>x.id == 0).name, name);
		});

		it('Should return an error when hero does not exist', function() {
			assert.equal('There is no hero with that id!',
				heroes.updateHeroName(404, 'blabla'));
		});
	});

	describe('#deleteHeroById()', function() {
		it('Should delete the hero', function() {
			heroes.deleteHeroById(0);
			assert.equal(heroes.heroes.find(x=>x.id == 0), undefined);
		});

		it('Should return an error when hero does not exist', function() {
			assert.equal('There is no hero with that id!', heroes.deleteHeroById(404));
		});
	});

	describe('#deleteHeroByName()', function() {
		it('Should delete the hero', function() {
			heroes.deleteHeroByName('Zero');
			assert.equal(heroes.heroes.find(x=>x.id == 0), undefined);
		});

		it('Should return an error when hero does not exist', function() {
			assert.equal('There is no hero with that id!', heroes.deleteHeroByName('blabla'));
		});
	});
});