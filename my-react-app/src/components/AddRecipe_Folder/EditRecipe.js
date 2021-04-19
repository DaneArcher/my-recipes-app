import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import DisplayRecipe from '../DisplayRecipe_Folder/DisplayRecipe'
import './AddRecipe.css'
import {RecipeForm, TagForm} from './RecipeForm'

/* TODO create a submition check response combined step 4 and 5 
    and remove step from submit function
    eddit scrape function
    when recipe is submited you should i overwrite it's history? should i save it's state history?*/

class EditRecipe extends Component{
    state = {
        title: '',
        recipe_id: ' ',
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
		url: '',
        changed_elements: {}
    }

    componentDidMount() {
        let {recipe} = this.props.location.state
        console.log("AT LINE 39")
        console.log(recipe)
        if (recipe){
            this.setState({
                ...recipe
            })
        }
        else{  
            console.log("inside else")
            //fetch from db                                  
            //display if recipe exist or say recipe does not exist
            //send recipe to the global state
            /*if this sends somthing to the global state and we still have to check the global state in this are to
            prevent unwanted fetches then case 2 is not needed*/
            let recipe_id = this.props.match.params.recipe_id

            let link = 'http://localhost:5000/edit_recipe?recipe_id='
            link = link.concat(recipe_id)

            fetch(link)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.recipe)
                this.setState({
                    ...data.recipe
                })
            })
        }
    }
    handleChange = (e) =>{
        let {changed_elements} = this.state
        
        changed_elements[e.target.name] = e.target.value
        this.setState({[e.target.name]: e.target.value, changed_elements}) //adding/updating values go via here too
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
        let {changed_elements} = this.state

        let ingredients = [...this.state.ingredients, ingredient];
        changed_elements["ingredients"] = ingredients
        this.setState({
            ingredients: ingredients
        })
        //keeping ingredient_tags parellel w/ ingredients
        let ingredient_tags = [...this.state.ingredient_tags, '']
        this.setState({
            ingredient_tags,
            changed_elements
		  })
	 }
	deleteIngredient = (index) =>{
        let {changed_elements} = this.state

		let {ingredients, ingredient_tags} = this.state
		ingredients.splice(index,1)
		ingredient_tags.splice(index,1)

        changed_elements["ingredients"] = ingredients
        changed_elements["ingredient_tags"] = ingredient_tags
		this.setState({
			ingredients,
			ingredient_tags,
            changed_elements
		})
	}

    parsedIngr = (e, index) =>{
		let {ingredient_tags, changed_elements} = this.state
		ingredient_tags[index] = e.target.value
        changed_elements["ingredient_tags"] = ingredient_tags
		this.setState({
			ingredient_tags,
            changed_elements
		})

     }
	 updateRecipe = () =>{

        let {recipe_id,changed_elements,step} = this.state
        changed_elements["recipe_id"] = recipe_id

        fetch('http://localhost:5000/edit', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changed_elements),
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
                    <div className='page'>
                        <RecipeForm recipe={this.state} handleChange={this.handleChange} addIngredient={this.addIngredient} deleteIngredient={this.deleteIngredient}/>
                        <button onClick={this.nextStep}>Next Step</button>
                    </div>
                )
            case 2:
                return(
                    <div className='page'>
                        in step 3
                        adding the ingredient tags
                        <TagForm ingredients={this.state.ingredients} ingredient_tags={this.state.ingredient_tags} parsedIngr={this.parsedIngr}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.nextStep}>Review</button>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <DisplayRecipe recipe={this.state}/>
                        <button onClick={this.previousStep}>Previous</button>
                        <button onClick={this.updateRecipe}>Submit</button>
                    </div>
                )
            case 4:
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

export default EditRecipe
