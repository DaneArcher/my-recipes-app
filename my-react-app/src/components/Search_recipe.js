import React, {Component} from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import DisplayRecipe from './add_recipe_comp/display_recipe.js'
import AddIngredient from './add_recipe_comp/add_ingredients.js'

class SearchRecipe extends Component{
    state = {
        title: '',
        ingredients: [],
        ingredient_tags: [],
		step: 1
    }
    handleChange = (input) => e =>{
        this.setState({[input]: e.target.value})
    }

	 nextSection = () =>{
        //console.log('button worked')
		  //console.log(e.target[0].value)
		  const {step} = this.state
		  this.setState({
			  step: step + 1
		  })
	 }
	 previousSection = () =>{
		//console.log('button worked')
		//console.log(e.target[0].value)
		const {step} = this.state
		this.setState({
			step: step - 1
		})
	
  }

    addIngredient = (ingredient) =>{
        //console.log(ingredient)
        let ingredients = [...this.state.ingredients, ingredient];
        this.setState({
            ingredients: ingredients
        })
        //keeping ingredient_tags parellel w/ ingredients
        let ingredient_tags = [...this.state.ingredient_tags, '']
        this.setState({
            ingredient_tags
		  })
		  //setState() is asynch
        //console.log(this.state.ingredients)
        //console.log(this.state.ingredient_tags)
	 }
	 deletIngredient = (index) =>{
		 let {ingredients, ingredient_tags} = this.state
		 ingredients.splice(index,1)
		 ingredient_tags.splice(index,1)
		 this.setState({
			 ingredients,
			 ingredient_tags
		 })
	 }


	 switchtype3 = e =>{
		const {step} = this.state
		this.setState({
			step: step + 2
		})
	 }

	 switchtype1 = e =>{
		const {step} = this.state
		this.setState({
			step: step - 2
		})
	 }

    render(){
        const {step} = this.state
        switch(step){
            case 1:
					return(
						<div>
							<h1>Recipe Search</h1>
							<div>
								<div>
									<label>
									Search by Ingredients&nbsp;&nbsp;&nbsp;
										<input type="radio" value = "Search by Ingredient" name="searchType" onChange={this.switchtype3}/> 
									</label>
								</div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<div>
									<label>
									Search by Recipe Name&nbsp;&nbsp;&nbsp;
										<input type="radio" value = "Search by Recipe Name" name="searchType"/> 
									</label>
									
								</div>
							</div>
							<Form>
								  <Form.Field width={3}> 
										<label>Name of Recipe</label>
										<Input
											 placeholder='Crème Brûlée'
											 onChange = {this.handleChange('title')}
										/>                        
								  </Form.Field>

							</Form>
								
							<Form>
								{/* <Form.TextArea label='Directions' onChange = {this.handleChange('directions')} rows="8" placeholder='Start by...'/>
								<Form.TextArea label='Chef Notes' onChange = {this.handleChange('chef_notes')} rows="3" placeholder='Simmer for 10 minutes instead of 5 iminutes'/> */}
								<Button onClick = {this.nextSection} animated>
									<Button.Content visible>Next</Button.Content>
									<Button.Content hidden>
											<Icon name = 'arrow right'/>
									</Button.Content>
								</Button>
							</Form>
						</div>
				  )
				case 2:
					return(
						<div>
							<p>Here are you results based on the follwing search term(s)</p>
							
								
							<Input value={this.state.title}/>
								
							
							<Button onClick={this.previousSection}>Previous</Button>
						</div>
						
					)
				case 3:
					return(
						<div>
							 <h1>Recipe Search</h1>
							 <div>
								<div>
									<label>
									Search by Ingredients&nbsp;&nbsp;&nbsp;
										<input type="radio" value = "Search by Ingredient" checked={true} name="searchType"/> 
									</label>
								</div>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<div onChange={this.switchtype1}>
									<label>
									Search by Recipe Name&nbsp;&nbsp;&nbsp;
										<input type="radio" value = "Search by Recipe Name" name="searchType"/> 
									</label>
									
								</div>
							 </div>
								<DisplayRecipe ingredients={this.state.ingredients} deletIngredient={this.deletIngredient}/>
								<Form>
									<AddIngredient addIngredient={this.addIngredient}/>
									<Button onClick = {this.nextSection} animated>
											<Button.Content visible>Next</Button.Content>
											<Button.Content hidden>
												<Icon name = 'arrow right'/>
											</Button.Content>
									</Button>
							</Form>
						</div>
					)
				case 4:
					return(
						<div>
							<p>Here are you results based on the follwing search term(s)</p>
							{this.state.ingredients.map((item, index) => (
								<div key={index}>
									<Input label={item}  value={this.state.ingredient_tags[index]}/>
								</div>
							))}
							<Button onClick={this.previousSection}>Previous</Button>
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

export default SearchRecipe;