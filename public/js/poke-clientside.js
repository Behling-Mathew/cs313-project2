 function viewCapturedPokemon() {
     console.log("Searching for captured Pokemon");

     $.post("/search", function (data) {
         console.log("Back from the server with:");
         console.log(data);
         
         $("#captured").prepend("<h3>You have captured the following Pokemon: </h3>");

         for (var i = 0; i < data.list.length; i++) {
             var retrievedPokemon = data.list[i];

             $("#captured").append("<li>" + retrievedPokemon.name + "</li>");

             console.log(retrievedPokemon.name.toUpperCase());

             if ($('.name:contains("' + retrievedPokemon.name.toUpperCase() + '")')) {
                 $('.name:contains("' + retrievedPokemon.name.toUpperCase() + '")').parent().prev().addClass("NewClass");

             }
         }
            let per = (data.list.length / 151) * 100;
            $("#captured").append("<li>Your Pokedex is <span class='lower'>" + per.toPrecision(2) + "%</span> complete.</li>");
            $('#caught').addClass("hide-me");
     })
 }