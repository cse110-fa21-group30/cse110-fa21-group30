// recipe-add.js
/** @module recipe-add */

window.addEventListener('DOMContentLoaded', init);

var ingredientIndex = 1;
var instructionIndex = 1;

/**
 * Initialize and call other function
 */
async function init() {
  addIngredient();
  addInstruction();

  goDashboard();
  goSearch();
  goAdd();
  goSettings();

}

/**
 * Click to go back to dashboard
 */
function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

/**
 * Click to go to search
 */
function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-searchPage.html');
  });
}

/**
 * Click to add the recipe card
 */
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}

/**
 * Click to go to settings
 */
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
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
    node.id = `ingredient-${ingredientIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-ingredient-${ingredientIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    img.setAttribute('onClick', 'deleteIngredient(this.id)');
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
    node.id = `instruction-${instructionIndex}`;
    let nodeInput = document.createElement('input');
    let br = document.createElement('br');
    nodeInput.type='text';
    nodeInput.appendChild(br);
    node.appendChild(nodeInput);
    let img = document.createElement('img');
    img.id = `delete-instruction-${instructionIndex}`;
    img.className = 'delete';
    img.src = 'assets/images/delete-button.png';
    img.setAttribute('onClick', 'deleteInstruction(this.id)');
    node.appendChild(img);
    box.appendChild(node);
  });
}

/**
 * Click to delete a line for filling ingredients
 * @param {String} deleteImageId - ID of the delete button image at the line
 */
function deleteIngredient(deleteImageId) {
  let id = deleteImageId.substring(18);
  console.log(id);
  let nodeId = 'ingredient-' + id;
  let node = document.getElementById(nodeId);
  node.remove();
}

/**
 * Click to delete a line for filling instructions
 * @param {String} deleteImageId - ID of the delete button image at the line
 */
function deleteInstruction(deleteImageId) {
  let id = deleteImageId.substring(19);
  console.log(id);
  let nodeId = 'instruction-' + id;
  let node = document.getElementById(nodeId);
  node.remove();
}
