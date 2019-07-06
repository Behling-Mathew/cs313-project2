const pokeModel = require("../models/pokeModel.js");

function search(req, res) {

	pokeModel.searchPokemon(function(error, results) {
		res.json(results);
	});

}

module.exports = {
    search: search
};