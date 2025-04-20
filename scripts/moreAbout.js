async function mainInfo(index) {
  mainActive();
  loadMoreAboutPokemon();
  let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  moreAboutPokemonRef.innerHTML = "";
  moreAboutPokemonRef.classList.remove("evoMainDesign");
  moreAboutPokemonRef.classList.remove("evoMainDesignForMore");
  moreAboutPokemonRef.innerHTML = await getMainInfoTemplate(pokemonInfo);
  await getAbilities(pokemonInfo);
  disableLoadMoreAboutPokemon();
}

function mainActive() {
  toggleActivity("mainInfo", true);
  toggleActivity("statsInfo", false);
  toggleActivity("evoChainInfo", false);
}

function getAbilities(pokemonInfo) {
  let abilitiesRef = document.getElementById("abilities");
  let abilitiesHTML = pokemonInfo.abilities
    .map((abilities) => `<td>${abilities.ability.name}</td>`)
    .join(", ");
  abilitiesRef.innerHTML += abilitiesHTML;
}

async function mainInfoAboutFiltered(index) {
  mainActive();
  loadMoreAboutPokemon();
  let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  moreAboutPokemonRef.innerHTML = "";
  moreAboutPokemonRef.classList.remove("evoMainDesign");
  moreAboutPokemonRef.classList.remove("evoMainDesignForMore");
  moreAboutPokemonRef.innerHTML = await getMainInfoTemplate(pokemonInfo);
  await getAbilities(pokemonInfo);
  disableLoadMoreAboutPokemon();
}

async function statsInfo(index) {
  statsActive();
  loadMoreAboutPokemon();
  let pokemonInfo = await fetchPokemonInfo(pokemonsRender[index].url);
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  moreAboutPokemonRef.innerHTML = "";
  moreAboutPokemonRef.classList.remove("evoMainDesign");
  moreAboutPokemonRef.classList.remove("evoMainDesignForMore");
  for (let index = 0; index < pokemonInfo.stats.length; index++) {
    let infoStats = pokemonInfo.stats[index];
    moreAboutPokemonRef.innerHTML += await getStatsInfoTemplate(infoStats);
  }
  disableLoadMoreAboutPokemon();
}

function statsActive() {
  toggleActivity("mainInfo", false);
  toggleActivity("statsInfo", true);
  toggleActivity("evoChainInfo", false);
}

async function statsInfoAboutFiltered(index) {
  statsActive();
  loadMoreAboutPokemon();
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  removeClasses();
  let pokemonInfo = await fetchPokemonInfo(currentNames[index].url);
  for (let index = 0; index < pokemonInfo.stats.length; index++) {
    let infoStats = pokemonInfo.stats[index];
    moreAboutPokemonRef.innerHTML += await getStatsInfoTemplate(infoStats);
  }
  disableLoadMoreAboutPokemon();
}

function removeClasses() {
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  moreAboutPokemonRef.innerHTML = "";
  moreAboutPokemonRef.classList.remove("evoMainDesign");
  moreAboutPokemonRef.classList.remove("evoMainDesignForMore");
}

async function evoChainInfo(index) {
  evoActive();
  loadMoreAboutPokemon();
  let refMoreAboutPokemon = document.getElementById("moreAboutPokemon");
  refMoreAboutPokemon.innerHTML = "";
  refMoreAboutPokemon.classList.add("evoMainDesign");
  let pokemonDetails = await fetchPokemonInfo(pokemonsRender[index].url);
  let evoDetails = await fetchEvoDetails(pokemonDetails.species.url);
  let evoChain = await fetchEvoDetails(evoDetails.evolution_chain.url);
  await getFirstEvo(evoChain);
  await getSecondEvo(evoChain);
  await getThirdEvo(evoChain);
  disableLoadMoreAboutPokemon();
}

function evoActive() {
  toggleActivity("mainInfo", false);
  toggleActivity("statsInfo", false);
  toggleActivity("evoChainInfo", true);
}

async function getFirstEvo(evoChain) {
  let firstPokemon = evoChain.chain.species.name;
  let responseFirstPokemon = await fetchPokemonEvo(firstPokemon);
  let refMoreAboutPokemon = document.getElementById("moreAboutPokemon");
  refMoreAboutPokemon.innerHTML += getEvoOfPokemon(responseFirstPokemon);
}

async function getSecondEvo(evoChain) {
  let refMoreAboutPokemon = document.getElementById("moreAboutPokemon");
  for (let index = 0; index < evoChain.chain.evolves_to.length; index++) {
    if (evoChain.chain.evolves_to.length <= 2) {
      let refEvolveMid = evoChain.chain.evolves_to[index];
      let responseSecondPokemon = await fetchPokemonEvo(
        refEvolveMid.species.name
      );
      refMoreAboutPokemon.innerHTML += getEvoOfPokemonWithArrow(
        responseSecondPokemon
      );
    }
    if (evoChain.chain.evolves_to.length > 2) {
      refMoreAboutPokemon.classList.remove("evoMainDesign");
      refMoreAboutPokemon.classList.add("evoMainDesignForMore");
      let refEvolveMid = evoChain.chain.evolves_to[index];
      let responseSecondPokemon = await fetchPokemonEvo(
        refEvolveMid.species.name
      );
      refMoreAboutPokemon.innerHTML += getEvoOfPokemonWithArrow(
        responseSecondPokemon
      );
    }
  }
}

async function getThirdEvo(evoChain) {
  let refMoreAboutPokemon = document.getElementById("moreAboutPokemon");
  for (let index = 0; index < evoChain.chain.evolves_to.length; index++) {
    let refEvolveLast = evoChain.chain.evolves_to[index];
    for (let index = 0; index < refEvolveLast.evolves_to.length; index++) {
      if (refEvolveLast.evolves_to.length >= 2) {
        refMoreAboutPokemon.classList.remove("evoMainDesign");
        refMoreAboutPokemon.classList.add("evoMainDesignForMore");
      }
      let refSpeciesLast = refEvolveLast.evolves_to[index];
      let responseThirdPokemon = await fetchPokemonEvo(
        refSpeciesLast.species.name
      );
      refMoreAboutPokemon.innerHTML +=
        getEvoOfPokemonWithArrow(responseThirdPokemon);
    }
  }
}

async function evoChainInfoAboutFiltered(index) {
  evoActive();
  loadMoreAboutPokemon();
  let refMoreAboutPokemon = document.getElementById("moreAboutPokemon");
  refMoreAboutPokemon.innerHTML = "";
  refMoreAboutPokemon.classList.add("evoMainDesign");
  let pokemonDetails = await fetchPokemonInfo(currentNames[index].url);
  let evoDetails = await fetchEvoDetails(pokemonDetails.species.url);
  let evoChain = await fetchEvoDetails(evoDetails.evolution_chain.url);
  await getFirstEvo(evoChain);
  await getSecondEvo(evoChain);
  await getThirdEvo(evoChain);
  disableLoadMoreAboutPokemon();
}

async function fetchEvoDetails(url) {
  let response = await fetch(url);
  return (responseToJson = await response.json());
}

async function fetchPokemonEvo(name) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  let responseToJson = await response.json();
  return responseToJson;
}