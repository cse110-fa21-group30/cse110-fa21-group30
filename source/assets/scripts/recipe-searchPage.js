// recipe-searchPage.js

import * as backend from './backend.js';

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


let current_recipes = [];

async function init() {
  defaultPreference();

  bindSearchBar();
  bindSearchButton();
  bindCheckboxes();
}

/**
 * event listeners on search input change
 */
function bindSearchBar() {
  const input_field = document.getElementById('search-field');
  input_field.addEventListener('input', function() {
    const input = this.value;
    backend.search_suggest(input, 10, 3).then(suggestions => {
    // backend.search_suggest(input).then(suggestions => {
      clearDropdowns();
      // rebuild
      const search_bar = document.querySelector('.search-bar');
      suggestions.forEach(suggestion => {
        const dropdown = document.createElement('div');
        dropdown.className = 'suggest_dropdown';
        dropdown.innerHTML = suggestion;
        dropdown.addEventListener('click', function() {
          input_field.value = this.innerHTML;
          hitSearch();
        });
        search_bar.appendChild(dropdown);
      });
    });
  });
}

/**
 * event listeners on search button click
 */
function bindSearchButton() {
  let recipe_list = document.querySelector('.recipes__wrapper');
  recipe_list.innerHTML = '';  // clear old recipe cards
  //set the default filter
  defaultPreference();
  //select the button
  //once the button got clicked, request the data from api and then output the result
  let button = document.querySelector('#search-button');
  button.addEventListener('click', hitSearch);
  // alternatively, enter key also trigger a search
  const input_field = document.getElementById('search-field');
  input_field.addEventListener('keyup', e => {
    if (e.key === 'Enter') hitSearch();  // enter key pressed
  });
}

/**
 * displays the current recipes with filters applied
 */
function displayCards() {
  let recipe_list = document.querySelector('.recipes__wrapper');
  recipe_list.innerHTML = '';  // clear old recipe cards
  const recipe_hashes = backend.filter_intolerance(current_recipes, readPreference());
  for(let recipe_hash of recipe_hashes) {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = backend.get_recipe(recipe_hash);
    document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  }
  configureRecipeCards();
}

/**
 * app logic when we hit search
 */
function hitSearch() {
  clearDropdowns();  // remove all suggestions
  
  let recipe_name = document.querySelector('#search-field').value;
  // backend.search_recipe(recipe_name, false)
  backend.search_recipe(recipe_name, true)
    .then(data => current_recipes = data)
    .then(displayCards);

  // USE FOR TESTING PURPOSES – to not overwhelm API
  // let recipe = backend.get_recipe('Apple Pie Pancakes$5316512375443084');
  // let recipeCard = document.createElement('recipe-card');
  // recipeCard.data = recipe;
  // document.querySelector('.recipes__wrapper').appendChild(recipeCard);
  // configureRecipeCards();
}

/**
 * wipe dropdowns
 */
function clearDropdowns() {
  const search_bar = document.querySelector('.search-bar');
  const suggest_dropdowns = document.getElementsByClassName('suggest_dropdown');
  let dropdown_length = suggest_dropdowns.length;
  while (dropdown_length --> 0) 
    search_bar.removeChild(suggest_dropdowns[dropdown_length]);
}

/**
 * add event listeners for each recipe card onclick
 */
function configureRecipeCards() {
  const recipeCards = document.querySelectorAll('recipe-card');
  recipeCards.forEach((card) => {
    card.addEventListener('click', () => {
      backend.select_recipe(card.shadowRoot.querySelector('.hash').textContent);
      window.location.assign('recipe-detail.html');
    });
  });
}

/**
 * bind displayCards function to the event of toggling checkboxes
 */
function bindCheckboxes() {
  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  for (let checkbox of leftCkbox) checkbox.addEventListener('change', displayCards);
  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for (let checkbox of rightCkbox) checkbox.addEventListener('change', displayCards);
}

/**
 * read the check boxes to return a list of preferences
 * @returns {Array<string>} an array of preferences
 */
function readPreference(){
  let intolerance_list = [];
  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');

  for(let i = 0; i < leftCkbox.length; i++){
    let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
    if(ingredientBox.checked){
      let ingredientText = leftCkbox[i].innerText.trim();
      intolerance_list.push(ingredientText);
    }
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    if(ingredientBox.checked){
      let ingredientText = rightCkbox[i].innerText.trim();
      intolerance_list.push(ingredientText);
    }
  }

  return intolerance_list;
}

/**
 * apply the default preferences to the UI
 */
function defaultPreference(){
  let intolerance_list = backend.get_intolerance();

  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  for(let i = 0; i < leftCkbox.length; i++){
    let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = leftCkbox[i].innerText.trim();

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = rightCkbox[i].innerText.trim();

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

}
