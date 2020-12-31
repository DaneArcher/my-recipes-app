import React, {Component} from 'react'
import DisplayIngredients from './display_ingredients'
import AddIngredient from './add_ingredients'
//import {Link} from 'react-router-dom'
import './AddRecipe.css'

class AddRecipe extends Component{
    state = {
        title: '',
        author: '',
        src: '',
        quick_description: '',
        total_time: '',
        prep_time: '',
        cook_time: '',
        rating: '',
        servings: '',
        calories: '',
        ingredients: [],
        ingredient_tags: [],
        directions: '',
		chef_notes: '',
		img_link: '',
		step: 2,
		url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756'
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    keyPress = (e) =>{
        if(e.keyCode === 13){
            this.scrape()
        }    
    }
    nextStep = () =>{
        let {step} = this.state
        this.setState({
            step: step + 1
        })
    }
    previousStep = () => {
        let {step} = this.state
        this.setState({
            step: step -1
        })
    }
    addIngredient = (ingredient) =>{
        let ingredients = [...this.state.ingredients, ingredient];
        this.setState({
            ingredients: ingredients
        })
        //keeping ingredient_tags parellel w/ ingredients
        let ingredient_tags = [...this.state.ingredient_tags, '']
        this.setState({
            ingredient_tags
		  })
	 }
	 deleteIngredient = (index) =>{
		 let {ingredients, ingredient_tags} = this.state
		 ingredients.splice(index,1)
		 ingredient_tags.splice(index,1)
		 this.setState({
			 ingredients,
			 ingredient_tags
		 })
	 }
    scrape = () =>{
		let link = 'http://localhost:5000/scrape_recipes?link='
		const {url} = this.state
		link = link.concat(url)
		 //https://www.foodnetwork.com/recipes/food-network-kitchen/prosciutto-wrapped-chicken-kebabs-3362756

		fetch(link)
		.then(response => response.json())
		.then(data => {
			//console.log(data)
			this.setState({
				directions: data.directions,
				title: data.title,
				ingredients: data.ingredients,
				img_link: data.img_link
			})
			//keeping ingredient tags same length as ingredients
			let len = data.ingredients.length
			for(let i = 0; i < len; i++){
				let ingredient_tags = [...this.state.ingredient_tags, '']
				this.setState({
					ingredient_tags
				  })
			}
			//.then(()=>{this.nextSection()})
			this.nextStep()
		})
    }
    parsedIngr = (index) => e =>{
		//console.log('hello') 
		let {ingredient_tags} = this.state
		ingredient_tags[index] = e.target.value
		this.setState({
			ingredient_tags
		})
		//console.log(this.state.ingredients)
		//console.log(this.state.ingredient_tags)
	 }
    render(){
        let {step} = this.state
        switch(step){
            case 1:
                return(
                    <div className='scrape-box'>
                        <label>Site to Scrape:</label>
                        <input type='text' placeholder='URL' onChange={this.handleChange} value = {this.state.url} name='url' onKeyDown={this.keyPress}/>
                        <button onClick={this.scrape}>Scrape</button>
                        <span> OR </span>
                        <button onClick={this.nextStep}>Skip</button>
                    </div>
                )
            case 2:
                return(
                    <div className='page'>
                        <label>Title</label>
                        <input name='title' value={this.state.title} onChange={this.handleChange} placeholder='Title'/>
                        <label>Author</label>
                        <input name='author' value={this.state.author} onChange={this.handleChange} placeholder='Author'/>
                        <label>Source</label>
                        <input name='src' value={this.state.src} onChange={this.handleChange} placeholder='Website, Book, Magazine, (optional)'/>
                        <label>Quick Descriptions</label>
                        <textarea name='quick_description' value={this.state.quick_description} onChange={this.handleChange} placeholder='Toasted tortillas topped with flavorful black beans and fresh vegetables make a quick and delicious...'/>
                        <div className='descriptors'>
                            <label>Total Time</label>
                            <input name='total_time' value={this.state.total_time} onChange={this.handleChange} placeholder='X Hours or X Minutes'/>
                            <label>Cook Time</label>
                            <input name='cook_time' value={this.state.cook_time} onChange={this.handleChange} placeholder='X Hours or X Minutes'/>
                            <label>Prep Time</label>
                            <input name='prep_time' value={this.state.prep_time} onChange={this.handleChange} placeholder='X Hours or X Minutes'/>
                            <label>Searvings</label>
                            <input name='servings' value={this.state.servings} onChange={this.handleChange} placeholder='4'/>
                            <label>Calories Per Serving</label>
                            <input name='calories' value={this.state.calories} onChange={this.handleChange} placeholder='375'/>
                        </div>
                        <label>Rating</label>
                        <input name='rating' value={this.state.rating} onChange={this.handleChange} placeholder='4/5'/>
                        <DisplayIngredients ingredients={this.state.ingredients} deleteIngredient={this.deleteIngredient}/>
                        <AddIngredient addIngredient={this.addIngredient}/>  
                        <label>Directions</label>
                        <textarea name='directions' value={this.state.directions} onChange={this.handleChange} placeholder='Start by...'/>
                        <label>Notes</label>
                        <textarea name='chef_notes' value={this.state.chef_notes} onChange={this.handleChange} placeholder='Simmer for 10 minutes instead of 5 iminutes'/>

                        <label>Website URL</label>
                        <input name='url' value={this.state.url} onChange={this.handleChange} placeholder='www.foodnetwork.com'/>
                        <label>Image Link</label>
                        <input name='img_link' value={this.state.img_link} onChange={this.handleChange}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.nextStep}>Next Step</button>
                    </div>
                )
            case 3:
                return(
                    <div className='page'>
                        in step 3
                        adding the ingredient tags
                        {this.state.ingredients.map((item, index) =>(
                            <div key={index}>
                                <label>{item}</label>
                                <input value={this.state.ingredient_tags[index]} onChange={this.parsedIngr(index)}/>
                            </div>
                        ))}
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.nextStep}>Review</button>
                    </div>
                )
            case 4:
                return(
                    <div>
                        review and submit
                        display recipe component goes here
                        <button onClick={this.previousStep}>Previous</button>
                        <button >Submit</button>
                    </div>
                )
            default:
                //https://eslint.org/docs/rules/default-case
                return(                    
                    <p>In default case COME BACK TO THIS AND LEARN MORE</p>
                )
        }
    }
}

export default AddRecipe