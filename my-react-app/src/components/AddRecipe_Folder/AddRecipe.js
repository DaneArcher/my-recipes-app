import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import DisplayRecipe from '../DisplayRecipe_Folder/DisplayRecipe'
import './AddRecipe.css'
import {RecipeForm, TagForm} from './RecipeForm'

/* TODO create a submition check response combined step 4 and 5 
    and remove step from submit function
    eddit scrape function
    when recipe is submited you should i overwrite it's history? should i save it's state history?*/

class AddRecipe extends Component{
    state = {
        title: '',
        author: '',
        src: '',
        quick_description: '',
        level: '',
        total_time: '',
        prep_time: '',
        cook_time: '',
        rating: '',
        servings: '',
        calories: '',
        ingredients: [],
        ingredient_tags: [],
        inactive_time: '',
        directions: '',
		chef_notes: '',
		img_link: '',
		step: 1,
		url: ''
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
			console.log(data)
			for(let key in data){
                //console.log(key, data[key])
				this.setState({
					[key]: data[key]
				})
			}
			//keeping ingredient tags same length as ingredients
			let len = data.ingredients.length
			for(let i = 0; i < len; i++){
				let ingredient_tags = [...this.state.ingredient_tags, '']
				this.setState({
					ingredient_tags
				  })
			}
			this.nextStep()
		})
    }
    parsedIngr = (e, index) =>{
		let {ingredient_tags} = this.state
		ingredient_tags[index] = e.target.value
		this.setState({
			ingredient_tags
		})
     }
	 submitRecipe = () =>{
        let copyState = {}
        let {step} = this.state
        Object.assign(copyState, this.state)
        delete copyState["step"];

        fetch('http://localhost:5000/add_recipes', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(copyState),
        }).then(response => response.text())
        .then(text => {
            if(text === "response is good"){
               this.setState({step: step + 1})
            }
           })		 
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
                        <DisplayRecipe recipe={this.state}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.submitRecipe}>Submit</button>
                    </div>
                )
            case 5:
                return(
                    <div>
                        <h1> Your Recipe Was successfully submitted</h1>
                        <button><Link to='/'>Return Home</Link></button>
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
