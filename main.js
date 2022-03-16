function get_pokemon(name){

    base_url = "https://pokeapi.co/api/v2/pokemon/"


    url = base_url + name

    fetch( url )
      .then( res => {
          
          if(res.status != '200'){
            document.querySelector("img").src = 'missingo.png'
            document.querySelector("#poke-name").innerText = "Invalid Name"
            clean_fields()
            throw new Error('Invalid pokemon Name')
          }  
          return res.json()  
       })
      .then( data => {
          
          console.log( data )


          /*** Image ***/  
          setImage(data)  

          /*** Name ***/    
          setNameAndNumber(data)

          /*** Height and Weight ***/
          setHeightAndWeight(data)

          /*** Types ***/    
          setTypes(data)

          /*** Stats ***/
          setStats(data)

         /*** Abilities ***/
         setAbilities(data)

          
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

function setImage(data){
    sprites = data['sprites']
    sprite = sprites['front_default']

    anime_image = sprites['other']['dream_world']['front_default']
    document.querySelector("img").src = sprite
    //~ document.querySelector("img").src = anime_image
}

function setNameAndNumber(data){
    number = data['id']
    name = data['name']
    title = `#${number} ${name}`  

    document.querySelector("#poke-name").innerText = capitalize(name)  
    document.querySelector("#number").innerText = number  
}

function setHeightAndWeight(data){
    document.querySelector("#height").innerText = data['height']
    document.querySelector("#weight").innerText = data['weight']    
}

function setTypes(data){
    types = []

    for( item of data['types']){
        type = item['type']['name']
        types.push(type)
    }  

    document.querySelector("#types").innerText =  types 
}

function setStats(data){
    stats = data['stats']

    hp = stats[0]['base_stat']
    attack = stats[1]['base_stat']
    defense = stats[2]['base_stat']
    special_attack = stats[3]['base_stat']
    special_defense = stats[4]['base_stat']
    speed = stats[5]['base_stat']

    document.querySelector("#hp").innerText = hp
    document.querySelector("#attack").innerText = attack
    document.querySelector("#defense").innerText = defense            
    document.querySelector("#special-attack").innerText = special_attack
    document.querySelector("#special-defense").innerText = special_defense
    document.querySelector("#speed").innerText = speed  
}

function capitalize(text){
    return text[0].toUpperCase() + text.slice(1)
}

function clean_fields(){
    document.querySelector("#number").innerText = ''
    document.querySelector("#height").innerText = ''
    document.querySelector("#weight").innerText = ''
    document.querySelector("#types").innerText = ''
}

function setAbilities(data){
    abilities = []

    ability_url = data['abilities'][0]['ability']['url']
    setAbilityDescription(ability_url)

    container = document.querySelector("#abilities")
    for( obj of data['abilities'] ){
        ability = obj['ability']['name']
        abilities.push(obj['ability']['name'])

        span = document.createElement('span')
        span.innerText = ability

        container.appendChild(span)
    }

    
}

function setAbilityDescription(url_ability){
    fetch(url_ability)
    .then( res => res.json() )
    .then( data => {
        console.log(data)
        console.log(data['effect_entries'][1])

        effect = data['effect_entries'][1]['effect']
        short_effect = data['effect_entries'][1]['short_effect']

        // remove \n
        effect = effect.split('\n').join('')

        console.log(effect, short_effect)

        document.querySelector("#ability-description").innerText = effect
        
    })

    
    
}

function getRandomPokemon(){
    random_number = Math.ceil( Math.random() * 151 )
    get_pokemon(random_number)
}

getRandomPokemon()
