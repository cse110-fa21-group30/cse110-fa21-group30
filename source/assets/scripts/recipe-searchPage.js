// recipe-searchPage.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goDashboard();
  goSearch();
  goAdd();
  goSettings();

  // Create a recipe card with mock data
  let recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard);

  let recipeCard2 = document.createElement('recipe-card');
  recipeCard2.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard2);

  let recipeCard3 = document.createElement('recipe-card');
  recipeCard3.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard3);

  let recipeCard4 = document.createElement('recipe-card');
  recipeCard4.data = {};
  document.querySelector('.recipes__wrapper').appendChild(recipeCard4);

}

function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace("index.html");
  });
}

function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace("recipe-searchPage.html");
  });
}
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace("recipe-add.html");
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace("#");
  });
}