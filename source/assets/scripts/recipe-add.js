//recipe-add.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
    addIngredient();
    addInstruction();

    goDashboard();
    goSearch();
    goAdd();
    goSettings();



}

function addIngredient() {
    const btn = document.getElementById('ingredientButton');
    const box = document.getElementById('ingredientOrderedList');
    console.log('hi');
  
    btn.addEventListener('click', () => {
        console.log('inside');
        let node = document.createElement("LI");  
        let nodeInput = document.createElement("input");
        let br = document.createElement('br');
        nodeInput.type='text';
        nodeInput.appendChild(br);
        node.appendChild(nodeInput);
        box.appendChild(node);
      
    });
}

function addInstruction() {
    const btn = document.getElementById('instructionButton');
    const box = document.getElementById('instructionOrderedList');
    console.log('hiiii');
  
    btn.addEventListener('click', () => {
        console.log('inside');
        let node = document.createElement("LI");  
        let nodeInput = document.createElement("input");
        let br = document.createElement('br');
        nodeInput.type='text';
        nodeInput.appendChild(br);
        node.appendChild(nodeInput);
        box.appendChild(node);
      
    });
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