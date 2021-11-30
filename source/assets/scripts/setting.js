// settings.js

window.addEventListener('DOMContentLoaded', init);

async function init() {
  goPreferenceSetting();
  goVersion();

  goDashboard();
  goSearch();
  goAdd();
  goSettings();
}

function goVersion(){
  const prefClass = document.getElementsByClassName('version')[0];
  const imgBtn = prefClass.getElementsByTagName('p')[1];
  imgBtn.addEventListener('click', () => {
    window.location.replace('version.html');
  });
}

function goPreferenceSetting() {
  const prefClass = document.getElementsByClassName('preference')[0];
  const imgBtn = prefClass.getElementsByTagName('p')[1];
  imgBtn.addEventListener('click', () => {
    window.location.replace('preference-setting.html');
  });
}


function goDashboard() {
  const btn = document.getElementsByClassName('nav-dashboard');

  btn[0].addEventListener('click', () => {
    window.location.replace('index.html');
  });
}

function goSearch() {
  const btn = document.getElementsByClassName('nav-search');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-searchPage.html');
  });
}
function goAdd() {
  const btn = document.getElementsByClassName('nav-add');

  btn[0].addEventListener('click', () => {
    window.location.replace('recipe-add.html');
  });
}
function goSettings() {
  const btn = document.getElementsByClassName('nav-settings');

  btn[0].addEventListener('click', () => {
    window.location.replace('settings.html');
  });
}