/** aqupi guarde cada componente en una variable para meter los datos de la api */
const mainScreen = document.querySelector('.main-screen');
const mainScreenError = document.querySelector('.main-screen-error');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeErrorImage = document.querySelector('.poke-error-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeName = document.querySelector('.pokename');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');

/**  esta funcion llama a la api si tiene resultados pinta todo de una vez */
const fetchPokemon = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
     //const url = 'https://pokeapi.co/api/v2/pokemon/'+pokeName;
     fetch(url).then((res) => {
        
         //console.log(res);"
         if(res.status!="200"){
             console.log(res);
             errorPrint("./NO.gif")
             
         }else{
            return res.json();
         }
         
     }).then((data =>{
         console.log(data);
         let pokimgf = data.sprites.front_default;
         let pokimgb = data.sprites.back_default;
         let pokename = data.name;
         console.log(pokimgf);
         console.log(pokimgb);
         console.log(pokename);
         mainScreenError.classList.add('hide');
         resetType();
         pokeName.textContent=pokename.toUpperCase();
         pokeFrontImage.src=pokimgf;
         pokeBackImage.src=pokimgb;
         const pokeTypes  = data['types'];
         if(pokeTypes[0] && pokeTypes[1]) {
            console.log("::::::::verdadero, verdadero::::::: ");
            pokeTypeOne.textContent = pokeTypes[0]['type']['name'].toUpperCase();
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = pokeTypes[1]['type']['name'].toUpperCase();
         } else  if(pokeTypes[0] && pokeTypes[1]==null) { 
            console.log("::::::::verdadero, Falso::::::: ");
            pokeTypeOne.textContent = pokeTypes[0]['type']['name'].toUpperCase();
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
         }
         pokeWeight.textContent = data['weight'];
         pokeHeight.textContent = data['height'];
         //imgPrint(pokimgf,pokimgb )
     }))
}

/*Funcion para cuando se inngresa mal el nombre del pokemon*/
const errorPrint = (urlimg) =>{
   // resetType();
   // ocultamos el main que contiene la imagen de enfrente , atras, el nombre, y tipo
    mainScreen.classList.add('hide');
    //aquí  removemos el hiden para que se muestre el pikachu diciendo no
    resetTypeError();
    console.log("entro a imprimir gif");
    pokeErrorImage.src=urlimg;  
    /* en esta parte como se mettio mal la info limpiamos el alto y ancho*/
    pokeWeight.textContent = ' ';
    pokeHeight.textContent = ' '; 
    
}

/*Funcion para cuando se le da clic al boton*/
const btnpokemon = () =>{
    
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    //fetchPokemon(pokeInput);  
    //console.log(pokeInput);
    fetchPokemon(pokeInput); 
}

/*Estas funciones sirven para remover el hiden que es ocultar osea para hacerñlo visible*/
const resetType = () => {
    mainScreen.classList.remove('hide');
   
    
  }
const resetTypeError = () => {
    mainScreenError.classList.remove('hide');
  } 