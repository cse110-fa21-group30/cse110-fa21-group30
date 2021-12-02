// recipe-add.js
/** @module recipe-add */

import * as backend from './backend.js';

window.addEventListener('DOMContentLoaded', init);

var ingredientIndex = 1;
var instructionIndex = 1;

/**
 * Initialize and call other function
 */
async function init() {
  defaultPreference();
  addIngredient();
  addInstruction();
  
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
    }
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
    }
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
