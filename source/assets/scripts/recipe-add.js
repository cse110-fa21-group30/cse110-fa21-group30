// recipe-add.js
/** @module recipe-add */

window.addEventListener('DOMContentLoaded', init);

import * as backend from './backend.js';

var ingredientIndex = 1;
var instructionIndex = 1;

/**
 * Initialize and call other function
 */
async function init() {
  defaultPreference();
  addIngredient();
  addInstruction();
  addNewRecipe();
}

/**
 * Add New Recipe to local storage
 */
function addNewRecipe() {
  const form = document.getElementById('add-recipe-form');

  form.addEventListener('submit', (event) => {
    // handle the form data
    console.log('New Recipe Added');

    event.preventDefault();
    let recipe = {};

    const nameField = document.getElementById('recipeName').value;
    recipe.name = nameField;

    const cookingTimeField = document.getElementById('cookingTime').value;
    recipe.readyInMinutes = cookingTimeField;

    const servingSizeField = document.getElementById('servingSize').value;
    recipe.servings = servingSizeField;

    let radios = document.getElementsByName('diff');
    for (let i = 0, length = radios.length; i < length; i++) 
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        recipe.difficulty = radios[i].value;
        console.log(radios[i].value);
        // only one radio can be logically checked, don't check the rest
        break;
      }
      

    var veganBox = document.getElementById('vegan');
    if (veganBox.checked)
      recipe.vegan = true;
    else
      recipe.vegan = false;
      

    var veggieBox = document.getElementById('veggie');
    if (veggieBox.checked)
      recipe.vegetarian = true;
    else
      recipe.vegetarian = false;
      

    //add image ???
      
    let ingredientListLength = document.querySelectorAll('#ingredientOrderedList li').length;

    let ingredientArr = [];
    console.log(ingredientListLength);
    let ingredientArrIndex = 0;
    
    // ingredientIndex: # of all the li's added (including the li's which are deleted)
    for(let i = 1; i <= ingredientIndex; i++){
      let str = 'ingredient-'+i;
      console.log(str);
      let ing = document.getElementById(str);
      // check whether the li is deleted - if deleted, it is null, don't add.
      if (ing !== null){
        console.log(ing.value);
        let theIngredient = {original:ing.value};
        ingredientArr[ingredientArrIndex] = theIngredient;
        ingredientArrIndex += 1;
      }
    }
    recipe.ingredients = ingredientArr;

    //instruction 
    let instructionListLength = document.querySelectorAll('#instructionOrderedList li').length;

    let instructionArr = [];
    console.log(instructionListLength);
    let instructionArrIndex = 0;
    
    // instructionIndex: # of all the li's added (including the li's which are deleted)
    for(let i = 1; i <= instructionIndex; i++){
      let str = 'instruction-'+i;
      console.log(str);
      let ing = document.getElementById(str);
      // check whether the li is deleted - if deleted, it is null, don't add.
      if (ing !== null){
        console.log(ing.value);
        let step = {number:i, step:ing.value};
        instructionArr[instructionArrIndex] = step;
        instructionArrIndex += 1;
      }
    }
    recipe.steps = instructionArr;

    recipe.intolerances = [];

    console.log(recipe);

    try {
      backend.add_recipe(recipe, true);  // using the backend to simply logic
      window.location.assign('index.html');
    } catch(e) {
      alert(e);
    }
  });
}

/**
 * Click to add a new line for filling ingredients
 */
function addIngredient() {
  let btn = document.getElementById('ingredientButton');
  let box = document.getElementById('ingredientOrderedList');
  console.log('hi');
  
  btn.addEventListener('click', () => {
    console.log('inside');
    ingredientIndex += 1;
    let node = document.createElement('LI');  
    node.id = `ingredientNode-${ingredientIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.id = `ingredient-${ingredientIndex}`;
    nodeInput.autocomplete = 'off';
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-ingredient-${ingredientIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    // Delete the node
    let nodeId = `ingredientNode-${ingredientIndex}`;
    img.onclick = function(){
      let node = document.getElementById(nodeId);
      node.remove();
    };
    node.appendChild(img);
    box.appendChild(node);
  });
}

/**
 * Click to add a new line for filling instructions
 */
function addInstruction() {
  let btn = document.getElementById('instructionButton');
  let box = document.getElementById('instructionOrderedList');
  console.log('hiiii');
  
  btn.addEventListener('click', () => {
    console.log('inside');
    instructionIndex += 1;
    let node = document.createElement('LI');  
    node.id = `instructionNode-${instructionIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.id = `instruction-${instructionIndex}`;
    nodeInput.autocomplete = 'off';
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-instruction-${instructionIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    // Delete the node
    let nodeId = `instructionNode-${instructionIndex}`;
    img.onclick = function(){
      let node = document.getElementById(nodeId);
      node.remove();
    };
    node.appendChild(img);
    box.appendChild(node);
  });
}

/**
 * Get the default preference and show it
 */
function defaultPreference(){
  let intolerance_list = backend.get_intolerance();

  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  for(let i = 0; i < leftCkbox.length; i++){
    let ingredientBox = leftCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = leftCkbox[i].innerText;

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

  const rightElmt = document.querySelector('.right');
  const rightCkbox = rightElmt.getElementsByClassName('container');
  for(let i = 0; i < rightCkbox.length; i++){
    let ingredientBox = rightCkbox[i].getElementsByTagName('input')[0];
    let ingredientText = rightCkbox[i].innerText;

    if(intolerance_list.includes(ingredientText))
      ingredientBox.checked = true;
    
  }

}
