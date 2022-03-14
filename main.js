function get_pokemon(name){

    base_url = "https://pokeapi.co/api/v2/pokemon/"


    url = base_url + name

    fetch( url )
      .then( res => res.json() )
      .then( data => {
          
          console.log( data )
          sprites = data['sprites']
          sprite = sprites['front_default']

          image = sprites['other']['dream_world']['front_default']

          document.querySelector("img").src = sprite
          document.querySelector("img").src = image
          document.querySelector("h1").innerText = name  

          types = data['types']
          type = types[0]['type']['name']
          document.querySelector("h3").innerText =  type 
          
       })
       .catch( err => {
          console.log(`error ${err} `)
       })
}

btn = document.querySelector("button")

btn.onclick = function(){
    name = document.querySelector("input").value
    get_pokemon(name)
    
}
