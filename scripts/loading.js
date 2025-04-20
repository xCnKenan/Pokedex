function showLoadingSpinner() {
  toggleVisibility("loadBtn", true);
  toggleVisibility("arrowDown", true);
  setLoadingHTML(true);
}

function disableLoadingSpinner() {
  setLoadingHTML(false);
  toggleVisibility("content", false);
  toggleVisibility("arrowDown", false);
  toggleVisibility("loadBtn", false);
}

function loadingPokemon() {
  setLoadingHTML(true);
  toggleVisibility("content", true);
  toggleVisibility("arrowDown", true);
  toggleVisibility("loadBtn", true);
}

function disableLoadingPokemon() {
  toggleVisibility("content", false);
  toggleVisibility("arrowDown", false);
  toggleVisibility("loadBtn", false);
  setLoadingHTML(false);
}

function setLoadingHTML(show) {
  let loadingRef = document.getElementById("loading");
  loadingRef.innerHTML = show ? templateLoading() : "";
  loadingRef.classList.toggle("loading", show);
}

function toggleVisibility(id, show) {
  let toggleRef = document.getElementById(id);
  if (!toggleRef) return;
  toggleRef.classList.toggle("d-none", show);
}

function toggleActivity(id, show) {
  let toggleRef = document.getElementById(id);
  if (!toggleRef) return;
  toggleRef.classList.toggle("active", show);
}

function goDown() {
  let contentRef = document.getElementById("content");
  window.scrollTo({
    top: contentRef.scrollHeight,
  });
}

function loadingContent() {
  let bodyRef = document.getElementById("body");
  bodyRef.classList.add("overflowHidden");
  let loadingRef = document.getElementById("loading");
  loadingRef.classList.add("overlay");
  loadingRef.innerHTML = templateLoading();
}

function disableLoadingContent() {
  let loadingRef = document.getElementById("loading");
  loadingRef.innerHTML = "";
  loadingRef.classList.remove("overlay");
  toggleVisibility("overlay", false);
}

function loadMoreAboutPokemon() {
  toggleVisibility("moreAboutPokemon", true);
  setLoadingMore(true);
  toggleVisibility("loadMoreAboutPokemon", false);
}

function setLoadingMore(show) {
  let loadingRef = document.getElementById("loadMoreAboutPokemon");
  if (!loadingRef) return;
  loadingRef.innerHTML = show ? templateLoading() : "";
}

function disableLoadMoreAboutPokemon() {
  let moreAboutPokemonRef = document.getElementById("moreAboutPokemon");
  moreAboutPokemonRef.classList.remove("d-none");
  let loadMoreAboutPokemonRef = document.getElementById("loadMoreAboutPokemon");
  loadMoreAboutPokemonRef.innerHTML = "";
  loadMoreAboutPokemonRef.classList.add("d-none");
}