import React from 'react';
import AddRecipe from './components/Add_recipe'
import SearchRecipe from './components/Search_recipe'
import Navbar from './components/NavBar'
import DisplayRecipe from './components/DisplayRecipe'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App() {
  // return(
  //   <DisplayRecipe/>
  // )
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route exact path='/' component={SearchRecipe}/>
        <Route path='/add' component={AddRecipe}/>
      </div>
    </BrowserRouter>
  );
<<<<<<< HEAD
=======
  
>>>>>>> e552d5d0a14517de8a40f771407068911920aa12
}

export default App;
