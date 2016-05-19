var HTTP = require('../services/httpservices');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
	listenables : [Actions],
	getIngredients: function(){
		HTTP.get('/ingredients')
		.then(function(json){
			this.ingredients = json;
			this.fireUpdate();
		}.bind(this));
	},
	postIngredient: function(text){
		if(!this.ingredients){
			this.ingredients=[];
		}
		var ingredient = {
			"text": text,
			"id": Math.floor(Date.now()/1000)+text
		};
		HTTP.post('/ingredients', ingredient)
		.then(function(response){
			this.getIngredients();
		}.bind(this));
		
		this.ingredients.push(ingredient);
		this.fireUpdate();
	},
	// refresh function
	fireUpdate: function(){
		this.trigger('change', this.ingredients);
	}
});

module.exports = IngredientStore;