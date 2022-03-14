function get_pokemon(name){

    base_url = "https://pokeapi.co/api/v2/pokemon/"


    url = base_url + name

    fetch( url )
      .then( res => {
          
          if(res.status != '200'){
            document.querySelector("img").src = 'missingo.png'
            throw new Error('Invalid pokemon Name')
          }  
          return res.json()  
       })
      .then( data => {
          
          console.log( data )


          /*** Image ***/  
          sprites = data['sprites']
          sprite = sprites['front_default']

          image = sprites['other']['dream_world']['front_default']
          document.querySelector("img").src = sprite
          document.querySelector("img").src = image

          /*** Name ***/    
          number = data['id']
          name = data['name']
          title = `#${number} ${name}`  

          document.querySelector("#poke-name").innerText = capitalize(name)  
          document.querySelector("#number").innerText = number  

          /*** Height and Weight ***/
          document.querySelector("#height").innerText = data['height']
          console.log(data['weigth']  )    
          document.querySelector("#weight").innerText = data['weight']    

          /*** Types ***/    
          types = []

          for( item of data['types']){
                type = item['type']['name']
                types.push(type)
          }  
          
          document.querySelector("#types").innerText =  types 
          
       })
       .catch( err => {
          console.log(`error ${err} `)
       })
}

btn = document.querySelector("button")

btn.onclick = function(){
    name = document.querySelector("input").value
    name = name.toLowerCase()
    get_pokemon(name)
    
}

function capitalize(text){
    return text[0].toUpperCase() + text.slice(1)
}
