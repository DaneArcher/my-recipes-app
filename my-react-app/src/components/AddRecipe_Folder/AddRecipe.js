import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import './AddRecipe.css'
import {RecipeForm, TagForm} from './RecipeForm'

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
    parsedIngr = (e, index) =>{
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
                        <RecipeForm recipe={this.state} handleChange={this.handleChange} addIngredient={this.addIngredient} deleteIngredient={this.deleteIngredient}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.nextStep}>Next Step</button>
                    </div>
                )
            case 3:
                return(
                    <div className='page'>
                        in step 3
                        adding the ingredient tags
                        <TagForm ingredients={this.state.ingredients} ingredient_tags={this.state.ingredient_tags} parsedIngr={this.parsedIngr}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.nextStep}>Review</button>
                    </div>
                )
            case 4:
                return(
                    <div>
                        {console.log(this.state)}
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