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
    let el = $('<div>').addClass('pokemon');

    let image = `${sprite}`;
    let nameEl = `${name}`.toUpperCase();
    let htmlString = "<div class='grid-cont'>" +
        "<img src='" + image + "'>" +
        "<p><span class='name'>" + nameEl + "</span> is a <span class='lower'>" + `${type}` + "</span>";
    htmlString += " type pokémon.</p>";

    let realWeight = `${weight}` / 10;
    let realHeight = `${height}` / 10;
    htmlString += "<ul><li>Weight: " + realWeight + " kg</li>";
    htmlString += "<li>Height: " + realHeight + " m</li></ul>";

    el.append([htmlString]);
    $('.pokemonsters').append(el);
    /*if($('.name:contains("PIKACHU")')){
        $('.name:contains("PIKACHU")').parent().prev().addClass("NewClass");*/
        //$('.name:contains("DRAGONITE")').append("<img src='../assets/pokeball.png'>");
   // }
   
}


$('button').click(() => {

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
})


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

