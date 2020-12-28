import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

class NavBar extends Component{
    state = {clicked: false}
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render(){
        return(
            <nav className='navbar'>
                <h1 className='navbar-logo'>Recipe Book<i className="fab fa-react"></i></h1>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fass fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    <li><Link className='nav-links' to='/'>Home</Link></li>
                    <li><Link className='nav-links' to='/add'>Add</Link></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
