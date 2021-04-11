import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar_Folder/NavBar';
import Search from './components/Search_Folder/Search'
import AddRecipe from './components/AddRecipe_Folder/AddRecipe'
import HomePage from './components/HomePage_Folder/HomePage'
import DisplayRecipe from './components/DisplayRecipe_Folder/DisplayRecipe';
import EditRecipe from './components/AddRecipe_Folder/EditRecipe';

function App() {
 
  return(
    <BrowserRouter>
      <div className='App'>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/SearchResults' component={Search}/>
          <Route path='/add' component={AddRecipe}/>
          <Route path='/recipe/:recipe_id' component={DisplayRecipe}/>
          <Route path='/edit/:recipe_id' component={EditRecipe}/>
        </Switch>      
      </div>
    </BrowserRouter>
  )
}
export default App;
