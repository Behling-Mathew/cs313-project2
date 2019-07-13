let htmlString = '';
const getPokemon = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => {
        let name = res.data.name;
        let sprite = res.data.sprites.front_default;
        let weight = res.data.weight;
        let height = res.data.height;
        let type = res.data.types[0].type.name;
        return {
            id,
            name,
            sprite,
            weight,
            height,
            type
        };
    })
}

const printPokemon = ({
    id,
    name,
    sprite,
    weight,
    height,
    type
}) => {
    //let el = $('<tr>').addClass('pokemon');

    let poke_id = `${id}`;
    let image = `${sprite}`;
    let nameEl = `${name}`.toUpperCase();
    let realWeight = `${weight}` / 10;
    let realHeight = `${height}` / 10;
    
    
    /*let htmlString = "<div class='grid-cont'>" +
        "<img src='" + image + "'>" +
        "<p><span class='name'>" + nameEl + "</span> is a <span class='lower'>" + `${type}` + "</span>";
    htmlString += " type pokémon.</p>";

    
    htmlString += "<ul><li>Weight: " + realWeight + " kg</li>";
    htmlString += "<li>Height: " + realHeight + " m</li></ul>";

    el.append([htmlString]);
    $('.pokemonsters').append(el);*/
    /*if($('.name:contains("PIKACHU")')){
        $('.name:contains("PIKACHU")').parent().prev().addClass("NewClass");*/
        //$('.name:contains("DRAGONITE")').append("<img src='../assets/pokeball.png'>");
   // }
    //let htmlString;
    if (nameEl == 'BULBASAUR')
        {
            htmlString += '<table id="pokeTable" class="table table-striped table-bordered" style="width:100%">';
            htmlString += '<thead><tr><th>ID</th><th>Sprite</th><th>Name</th><th>Dimensions</th></tr></thead><tbody>';
        }
    //htmlString += '<tr>';
    htmlString += "<tr><td>" + poke_id + "</td>";
    htmlString += "<td><img src='" + image + "'></td>"; 
    htmlString += "<td><span class='name'>" + nameEl + "</span> is a <span class='lower'>" + `${type}` + "</span> type pokémon.</td>";    
    htmlString += "<td><ul><li>Weight: " + realWeight + " kg</li><li>Height: " + realHeight + " m</li></ul></td></tr>";
    
    
    // try to get table to all load here but without repeating
    
    if (nameEl == 'MEW'){
        htmlString += '</tbody><tfoot><tr><th>ID</th><th>Sprite</th><th>Name</th><th>Dimensions</th></tr></tfoot></table>';
        $('.pokemonsters').append(htmlString);
        //$('#pokeTable').DataTable();
   /*     $('#pokeTable').dataTable( {
    "columnDefs": [
    { "orderable": false, "targets": 1 }
  ]
} );*/
        
      $('#pokeTable').dataTable({
          "aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, "All"]],
          "iDisplayLength": 10,
          "columnDefs": [
              {
                  "orderable": false,
                  "targets": 1
              }
      ]
      });


      }
    //el.append([htmlString]);
    
}




$('#btn').click(() => {

    let proms = []
    for (let i = 1; i <= 151; i++) {
        proms.push(getPokemon(i));
    }

    Promise.all(proms).then(pokemonsters => {
        pokemonsters.forEach(pk => printPokemon(pk))
    })
    btn.classList.add("hide-me");
    h3.classList.add("hide-me");
    $('#caught').removeClass("hide-me");
});


/*if($('.name').text().indexOf('Picachu')) {  // Checking the 
    
    console.log("found Pikachu");
    $(".name").text().indexOf('Pikachu').css("background-color", "black");

}*/

/*var text = $('.name').text();
console.log(text);
var comparingText = 'Pikachu';
if(text == comparingText) {
    
}*/
/*$(function() {
 $('span.name:contains("PIKACHU")').each(function () {
     console.log("Found PIKACHU");
            $(this).parent().addClass("NewClass"); // matched td add NewClass
        });


   });*/

