const { Pool } = require("pg");
const db_url = process.env.DATABASE_URL;
//console.log("DB URL: " + db_url);
const pool = new Pool({connectionString: db_url});

function searchPokemon(callback) {
	console.log("Searching the DB for Pokemon: ")

	var sql = 'SELECT name FROM pokemon WHERE caught = TRUE';
	

	pool.query(sql, function(err, db_results) {

		if (err) {
			throw err;
		} else {
			

			var results = {
					success:true,
					list:db_results.rows
				};

			callback(null, results);
            console.log(db_results.rows);
		}

	});

}

function markCaught(poke_id, callback) {
    
    console.log("Marking Pokemon as caught...");
    
    var sql = 'UPDATE pokemon SET caught = TRUE WHERE poke_id = $1::int';
    var params = [poke_id];
    
    pool.query(sql, params, function(err, db_results) {
        
        if (err) {
            throw err;
        } else {
            var results = {
            success:true,
            list:db_results.rows
        };
        
        callback(null, results);
        console.log(db_results.rows);
        }
    });
}

function releasePokemon(poke_id, callback) {
    
    console.log("Removing Pokemon from database...");
    
    var sql = 'UPDATE pokemon SET caught = FALSE WHERE poke_id = $1::int';
    var params = [poke_id];
    
    pool.query(sql, params, function(err, db_results) {
        
        if (err) {
            throw err;
        } else {
            var results = {
            success:true,
            list:db_results.rows
        };
        
        callback(null, results);
        console.log(db_results.rows);
        }
    });
}

module.exports = {
    searchPokemon: searchPokemon,
    markCaught: markCaught,
    releasePokemon: releasePokemon
};