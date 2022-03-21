function get_pokemon(name){

    base_url = "https://pokeapi.co/api/v2/pokemon/"
    url = base_url + name

    fetch( url )
      .then( res => {
          
          if(res.status != '200'){
            document.querySelector("img").src = 'missingo.png'
            document.querySelector("#poke-name").innerText = "Not Found"
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

        /*** Evolution Chain ***/
        setEvolutionChain(data)

          
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
    
    badges = document.querySelector("#types")
    badges.innerHTML = ''

    for( item of data['types']){
        badge = document.createElement('span')
        badge.classList.add('badge')        
        
        type = item['type']['name']
        badge.innerText = type

        badge.classList.add(type)

        badges.appendChild( badge )
    }  
     
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
    
    document.querySelector("#hp").innerText = ''
    document.querySelector("#attack").innerText = ''
    document.querySelector("#defense").innerText = ''
    document.querySelector("#special-attack").innerText = ''
    document.querySelector("#special-defense").innerText = ''
    document.querySelector("#speed").innerText = ''
    //~ document.querySelector("#abilities").innerHTML = ''
    
    document.querySelector("#ability-description").innerText = ''
}

function setAbilities(data){
    abilities = []

    ability_url = data['abilities'][0]['ability']['url']
    setAbilityDescription(ability_url)

    container = document.querySelector("#abilities")
    container.innerHTML = ''
    
    for( obj of data['abilities'] ){
        ability = obj['ability']['name']
        url = obj['ability']['url']

        
        abilities.push(obj['ability']['name'])

        span = document.createElement('span')
        span.classList.add("ability")
        span.url = url

        span.onclick = function(){
            setAbilityDescription(this.url)

            for( sp of document.querySelectorAll(".ability") ){
                sp.style.textDecoration = 'none'
            }
            
            this.style.textDecoration = 'underline'
        }    
        
        span.innerText = ability

        container.appendChild(span)
    }


    first_ability = document.querySelector(".ability")
    first_ability.style.textDecoration = 'underline'
    
}

function setAbilityDescription(url_ability){
    fetch(url_ability)
    .then( res => res.json() )
    .then( data => {
        

        effect = data['effect_entries'][1]['effect']
        short_effect = data['effect_entries'][1]['short_effect']

        // remove \n
        effect = effect.split('\n').join('')

        document.querySelector("#ability-description").innerText = effect
        
    })

    
    
}

function getRandomPokemon(){
    random_number = Math.ceil( Math.random() * 251 )
    get_pokemon(random_number)
}



function getEvolutionChain(chain_url){
    //~ url = `https://pokeapi.co/api/v2/evolution-chain/${chain_number}`

    names = []

    fetch( chain_url )
    .then( res => res.json() )
    .then( data => {
        names = []
        
        let current = data.chain

        name = current.species.name
        names.push(name)


        while( true ){
            current = current.evolves_to[0]

            try{
                name = current.species.name
                names.push(name)
            }catch{
                break;
            }            
        }
        //~ console.log(names)
        return names
    })
    .then( names => {
        let container = document.querySelector("#chain-evolution")
        container.innerHTML = ''  


       for( name of names){ 
            render_pokemon(name)
       }
    })
    
}

function setEvolutionChain(data){
    let number = data['id']
    let url = `https://pokeapi.co/api/v2/pokemon-species/${number}`

    fetch( url )
    .then( res => res.json())
    .then( data => {
        chain_url = data['evolution_chain']['url']
        getEvolutionChain(chain_url)
        
    })
    
}

function render_pokemon(name){

    base_url = "https://pokeapi.co/api/v2/pokemon/"
    url = base_url + name

    fetch( url )
      .then( res => {
          
          if(res.status != '200'){
            document.querySelector("img").src = 'missingo.png'
            document.querySelector("#poke-name").innerText = "Not Found"
            clean_fields()
            throw new Error('Invalid pokemon Name')
          }  
          return res.json()  
       })
      .then( data => {

          //~ console.log( data )
          let container = document.querySelector("#chain-evolution")

          let img = document.createElement('img')
          img.classList.add('chain-evolution-img')
          img.title = data.name  

          img.onclick = function(){
              get_pokemon(data.id)
          }  

          sprites = data['sprites']
          sprite = sprites['front_default']

          img.src = sprite
          container.appendChild(img)
          
    
       })
       .catch( err => {
          console.log(`error ${err} `)
       })
}

// Search Moves
document.querySelector("#search-move-button").onclick = function(){
    move = document.querySelector("#move-input").value
    move = move.toLowerCase()

    url = `https://pokeapi.co/api/v2/move/${move}`

    fetch( url)
    .then( res => res.json() )
    .then( data => {
        //~ console.log(data.type.name)
        move_type = data.type.name
        document.querySelector("#move-type").innerText = move_type
        document.querySelector("#move-type").classList = ''
        
        document.querySelector("#move-type").classList.add(move_type)
        document.querySelector("#move-type").classList.add('badge')
        
        accuracy = data.accuracy
        document.querySelector("#accuracy").innerText = accuracy + '%'
        
        description = data.effect_entries[0].effect
        document.querySelector("#move-description").innerHTML = description

        short_effect = data.effect_entries[0].short_effect
        document.querySelector("#short-effect").innerText = short_effect
        
    })
    .catch( err => {
        console.log(err)
        clean_move_fields()
    })
    
}

function clean_move_fields(){
    document.querySelector("#accuracy").innerText = ''
    
    document.querySelector("#move-description").innerHTML = 'Move Not Found !'

    document.querySelector("#short-effect").innerText = ''
        
}

function get_random_move(){
    move = Math.ceil( Math.random()*748)

    url = `https://pokeapi.co/api/v2/move/${move}`

    fetch( url)
    .then( res => res.json() )
    .then( data => {
        //~ console.log(data)

        document.querySelector("#move-input").value = data.name

        move_type = data.type.name
        document.querySelector("#move-type").innerText = move_type
        document.querySelector("#move-type").classList = ''
         
        document.querySelector("#move-type").classList.add(move_type)
        document.querySelector("#move-type").classList.add('badge')
        
        accuracy = data.accuracy
        document.querySelector("#accuracy").innerText = accuracy + '%'
        
        description = data.effect_entries[0].effect
        document.querySelector("#move-description").innerHTML = description

        short_effect = data.effect_entries[0].short_effect
        document.querySelector("#short-effect").innerText = short_effect
        
    })
    .catch( err => {
        console.log(err)
    })
    
}

getRandomPokemon()
