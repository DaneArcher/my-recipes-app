import React from 'react'
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom'


const Navbar = () =>{
	return(
		<Menu>
			<Menu.Menu  position='right'>
				<Menu.Item>
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/add">Add</Link>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	)
}
export default Navbar;