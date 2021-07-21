import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar_Folder/NavBar';
import Search from './components/Search_Folder/Search'
import AddRecipe from './components/AddRecipe_Folder/AddRecipe'
import HomePage from './components/HomePage_Folder/HomePage'
import DisplayRecipe from './components/DisplayRecipe_Folder/DisplayRecipe';
import EditRecipe from './components/AddRecipe_Folder/EditRecipe';
import {useAuth0} from '@auth0/auth0-react'; 

function App() {
 
  const{loginWithPopup,
        loginWithRedirect,
        logout,
        user,
        isAuthenticated} = useAuth0(); //destructuring

  return(
    <BrowserRouter>
      <div className='App'>
        <NavBar lwp={loginWithPopup} logout={logout} isLoggedIn={isAuthenticated}/>
        {/* <ul>
          <li>
            <button onClick={loginWithPopup}>Login with Popup</button>
          </li>
          <li>
            <button onClick={loginWithRedirect}>Login with Redirect</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul> */}
        <h3> User is {isAuthenticated ? "Logged in" : "Not Logged In"}</h3>
        {isAuthenticated && 
        (<pre style={{textAlign: 'start'}}>
          {JSON.stringify(user,null,2)}
        </pre>)}
        
        
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
