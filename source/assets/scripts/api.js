async function search_recipe_name(name){
    let response=await fetch(`https://api.edamam.com/search?q=${name}&app_id=b5f49952&app_key=5c2d978fabfbb048d95adf40f11e6fea`);
    let data=await response.json();
    return data.hits;
  }
  
  async function search_recipe_name_health(name,health)//health is an array
  {
    let response=await fetch(`https://api.edamam.com/search?q=${name}&health=${health}&app_id=b5f49952&app_key=5c2d978fabfbb048d95adf40f11e6fea`);
    let data=await response.json();
    return data.hits;
  }
  
  
  async function search_recipe_id(id){
    let response=await fetch(`https://api.edamam.com/api/recipes/v2/${id}?app_id=b5f49952&app_key=5c2d978fabfbb048d95adf40f11e6fea&type=public`);
    let data=await response.json();
    return data;
  }
  
  function get_info_localstore(recipe_name){
    if(localStorage.getItem(recipe_name)) {
      return JSON.parse(localStorage.getItem(recipe_name))
    } else {
      console.log('Can not find recipe info in local,can not get');
    }
  }
  function set_localstore(recipe_name,recipe_info){
    if(!localStorage.getItem(recipe_name)) {
      localStorage.setItem(recipe_name,JSON.stringify(recipe_info));
    } else {
      console.log('Already Saved this recipe before,can not save it again');
    }
  }
  
  function remove_localstore(recipe_name){
    if(localStorage.getItem(recipe_name)) {
      localStorage.removeItem(recipe_name)
    } else {
      console.log('Do not have recipe info in local, can not remove');
    }
  }
  
  //if recipe can't be founded, the value will be undefined
  // a few sample to show how to use it
  search_recipe_name('chicken').then(value=>{
    a = value;
    set_localstore(a[0].recipe.label,a[0]);
    let b=get_info_localstore(a[0].recipe.label);
    console.log('test1');
    console.log(a[0].recipe.label);
    console.log(b);
    remove_localstore(a[0].recipe.label);
  });
  
  
  search_recipe_id('8275bb28647abcedef0baaf2dcf34f8b').then(value=>{
   a = value;
   console.log('test2');
   console.log(a);
  });
  
  search_recipe_name_health('chicken',['dairy-free']).then(value=>{
    a = value;
    console.log('test3');
    console.log(a);
  });
