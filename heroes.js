var database = require('./database');

class heroes{
	constructor(){
		this.heroes = database.heroes;
	}

	getAllHeroes(){
		return this.heroes;
	}

	getHeroById(id){
		var hero = this.heroes.find(hero => findHeroById(hero, id));

		return hero ? hero :  'There is no hero with that id!';
	}

	addHero(heroToAdd){
		if (this.heroes.filter(hero => findHeroById(hero, heroToAdd.id)).length != 0){
			return "A hero with that id already exists!";
		}
		else {
			this.heroes.push(heroToAdd);
			return "Hero added successfully";
		}
	}

	updateHeroName(id, name){
		var hero = this.heroes.find(hero => findHeroById(hero, id));

		if (hero !== null){
			hero.name = name;
			return 'Hero name updated!';
		}
		else{
			return 'There is no hero with that id!';
		}
	}

	deleteHeroById(id){
		var numOfHeroes = this.heroes.length;

		this.heroes = this.heroes.filter(hero => !findHeroById(hero, id));

		var newNumOfHeroes = this.heroes.length;

		return numOfHeroes == newNumOfHeroes ? 'There is no hero with that id!' : 'Hero deleted successfully!'
 	}

	deleteHeroByName(name){
		var numOfHeroes = this.heroes.length;

		this.heroes = this.heroes.filter(hero => !findHeroByName(hero, name));

		var newNumOfHeroes = this.heroes.length;

		return numOfHeroes == newNumOfHeroes ? 'There is no hero with that id!' : 'Hero deleted successfully!'
	}
}

module.exports = new heroes();

function findHeroById(hero, id) {
	return hero.id == id;
}

function findHeroByName(hero, name) {
	return hero.name == name;
}
