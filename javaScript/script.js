const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon_image');

const pokemonform = document.querySelector('.form');
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let procurarPokemon = 1;

// esta funcão puchar os dados do pokemon ('api').
const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    

}
//função render terá que buscar os dados do pokemon

const renderPokemon = async(pokemon)=>{
    pokemonName.innerHTML = 'Carregando ...';

    const data = await fetchPokemon (pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Nao Encontrado :c';
        pokemonNumber.innerHTML = '';
    }

  
}
// função de enviar o formulario do input
pokemonform.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value);
    
});

//função são do click dos botões 
buttonPrev.addEventListener('click', ()=>{
    if(procurarPokemon > 1){
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon);
    
}
      
});

buttonNext.addEventListener('click', ()=>{
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
      
  });
renderPokemon(procurarPokemon);


