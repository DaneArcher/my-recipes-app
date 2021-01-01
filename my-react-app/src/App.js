import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/NavBar_Folder/NavBar';
import Search from './components/Search_Folder/Search'
import AddRecipe from './components/AddRecipe_Folder/AddRecipe'

function App() {
 
  return(
    <BrowserRouter>
      <div className='App'>
        <NavBar/>
        <Route exact path='/' component={Search}/>
        <Route exact path='/add' component={AddRecipe}/>       
      </div>
    </BrowserRouter>
  )
}
export default App;
