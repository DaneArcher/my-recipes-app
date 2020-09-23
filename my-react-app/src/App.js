import React, {useEffect}from 'react';
import AddRecipe from './components/Add_recipe'
import SearchRecipe from './components/Search_recipe'



function App() {

/*
  useEffect(() => {
    fetch("/scrape_recipes?link=https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756")
    .then(response => response.json())
    .then(data => {console.log(data)})
  },[]);
  
 useEffect(() =>{
    const data = { username: 'example' };

    fetch('/add_recipes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.text())
    .then(text => {console.log(text)})
 },[])*/



  return (
    <div className="App">
      <SearchRecipe/>
    </div>
  );
}

export default App;
