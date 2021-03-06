// preference-setting.js
import * as backend from './backend.js';

if (localStorage.getItem('%not_first_visit')) 
  window.addEventListener('DOMContentLoaded', init);
else   // first visit
  window.location.assign('onBoardingPage.html');  // redirect


async function init() {
  goBack();
  defaultPreference();
  saveOrSaved();
  registerCheckboxes();
}

//helper function
function changePreference(){
  const leftElmt = document.querySelector('.left');
  const leftCkbox = leftElmt.getElementsByClassName('container');
  let intolerance_list = [];

  //leftCkbox[0].getElementsByTagName("input")[0].checked

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

  backend.set_intolerance(intolerance_list);
}

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



function saveOrSaved() {
  const btn = document.querySelector('.save');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  btn.addEventListener('click', () => {
    if (text.textContent === 'SAVE') {
      changePreference();
      text.textContent = 'SAVED';
      heart.src = 'assets/images/white-border-heart2.svg';
    } else {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/white-border-heart.svg';
    }
  });
}

/**
 * this register listeners to toggle the savebutton whenever checkboxes are changed
 */
function registerCheckboxes() {
  const checkboxes = document.querySelectorAll('input');
  const heart = document.getElementById('heart');
  const text = document.getElementById('save-or-not');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      text.textContent = 'SAVE';
      heart.src = 'assets/images/white-border-heart.svg';
    });
  });
}

function goBack(){
  const btn = document.getElementById('white-arrow-p');
  btn.addEventListener('click', () => {
    window.location.assign('settings.html');
  });
}
