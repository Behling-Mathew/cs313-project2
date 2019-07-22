const pokeModel = require("../models/pokeModel.js");

function search(req, res) {

	pokeModel.searchPokemon(function(error, results) {
		res.json(results);
	});

}

function mark(req, res) {
    
    var poke_id = req.body.id;
    
    pokeModel.markCaught(poke_id, function(error, results) {
        res.json(results);
    });
}

function release(req, res) {
    
    var poke_id = req.body.id;
    
    pokeModel.releasePokemon(poke_id, function(error, results) {
        res.json(results);
    });
}

module.exports = {
    search: search,
    mark: mark,
    release: release
};