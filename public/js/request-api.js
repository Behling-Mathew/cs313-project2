let htmlString = '';
const getPokemon = (id) => {
    return axios.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)       
    ]) 
        .then(res => {
        let name = res[0].data.name;
        let sprite = res[0].data.sprites.front_default;
        let weight = res[0].data.weight;
        let height = res[0].data.height;
        let type = res[0].data.types[0].type.name;
        let description = res[1].data.flavor_text_entries[52].flavor_text;
        return {
            id,
            name,
            sprite,
            weight,
            height,
            type,
            description
        };
    })
    
    
}

/*const getPokemon2 = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(res => {
        let description = res.data.flavor_text_entries[1].flavor_text;
        
        return {
           description
        };
    })
}*/


const printPokemon = ({
    id,
    name,
    sprite,
    weight,
    height,
    type,
    description
}) => {
    //let el = $('<tr>').addClass('pokemon');

    let poke_id = `${id}`;
    let image = `${sprite}`;
    let nameEl = `${name}`.toUpperCase();
    let realWeight = `${weight}` / 10;
    let realHeight = `${height}` / 10;
    let poke_description = `${description}`;
    
    
  
    
    
    
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
    htmlString += "<tr><td><input type='hidden'>" + poke_id + "</td>";
    htmlString += "<td><img src='" + image + "'><button class='mark-btn' id='"+ poke_id + "' onclick='caughtFunction("+poke_id+",\""+nameEl+"\")'>Mark as caught</button><button class='mark-btn2 hide-me2' id='"+ poke_id + "r' onclick='releaseFunction("+poke_id+",\""+nameEl+"\")'>Release to wild</button></td>"; 
    htmlString += "<td><span class='name'>" + nameEl + "</span> is a <span class='lower'>" + `${type}` + "</span> type pokémon.<p class='description'> "+poke_description+"</p></td>";    
    htmlString += "<td><ul class='dimensions'><li>Height: " + realHeight + " m</li><li>Weight: " + realWeight + " kg</li></ul></td></tr>";
    
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
          //"aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, "All"]],
          "aLengthMenu": [[-1, 100, 50, 10], ["All", 100, 50, 10]],
          "iDisplayLength": 151,
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
        //proms.push(getPokemon2(i));
    }

    Promise.all(proms).then(pokemonsters => {
        pokemonsters.forEach(pk => printPokemon(pk))
    })
    btn.classList.add("hide-me");
    h3.classList.add("hide-me");
    $('#caught').removeClass("hide-me");
});


function caughtFunction(poke_id,nameEl){
    console.log("caught function with id", poke_id);
    
    var p_id = poke_id;
   
    alert(nameEl + " marked as caught!");
    $('#'+poke_id).addClass("hide-me");
    $.post("/mark", {id:p_id})
    
}

function releaseFunction(poke_id,nameEl){
    console.log("Release to wild function with id", poke_id);
    
    var p_id = poke_id;
    var r = confirm('Are you sure you wish to release ' +nameEl+'?');
    if(r == true){
        alert(nameEl + " was released into the wild. Good bye, old friend!");
        $('#'+poke_id+'r').addClass("hide-me2");
        $('#'+poke_id+'r').parent().removeClass("NewClass"); 
        $.post("/release", {id:p_id})
        $('ul#captured').empty();
        //if($('ul#captured').empty()){
        //viewCapturedPokemon();
        //}
        
          if($('ul#captured').empty()){
        
        
                function myFunction() {
                    myVar = setTimeout(callFunc, 500);
                }

                function callFunc() {
                    viewCapturedPokemon();
                }
        myFunction();
        }
    
    }   
    
  
}
    


/*$('button').click(function(){
    //var pid = $(this).next().val();
    var pid = {'poke_id' : 151};
    $.post({
        traditional: true,
        url: './mark',
        contentType: 'application/json',
        data: JSON.stringify( pid ),
        dataType: 'json',
        success: function(response){ console.log( response ); }
    });
});*/
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


                             



