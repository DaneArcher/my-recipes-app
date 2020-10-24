import React, {Component} from 'react';
import { Form, Input, Button, Icon, Label, Card} from 'semantic-ui-react';
import DisplayIngredients from './add_recipe_comp/display_ingredients.js'
import AddIngredient from './add_recipe_comp/add_ingredients.js'

class SearchRecipe extends Component{
    state = {
        title: 'tempTitle',
        ingredients: [],
        ingredient_tags: [],
		step: 1,
		recipe_list: ['title12345678901234567890hellomynameisDane','title2','title3']
    }
    handleChange = (input) => e =>{
        this.setState({[input]: e.target.value})
    }

	 nextSection = () =>{
        //console.log('button worked')
		  //console.log(e.target[0].value)
		  this.get_recipes()
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
	get_recipes = () =>{
		// don't need to search the db if valuse are already there
		// unless they change the search parameters then you need to search
		// TODO: check if they change the search parmeters
		//step 1 is search by title step 3 is search by ingredient
		let {recipe_list, title, ingredients, step} = this.state
		if (recipe_list.length !== 0){
			if (step === 1){
				let link = '/search?title='
				link = link.concat(title)

				fetch(link)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					//check if this is the right way to swap lists?
					/*
					this.setState({
						recipe_list: data.recipes
					})*/
					//this.nextSection()
				})
			}
			else{
				//step == 3
				let link = '/search?ingredients='
				let ingredient_str = ''
				for(let i = 0; i < ingredients.length; i++){
					ingredient_str = ingredient_str.concat(ingredients[i], ',')
				}
				ingredient_str = ingredient_str.slice(0, -1)
				link = link.concat(ingredient_str)
				
				fetch(link)
				.then(response => response.json())
				.then(data => {
					console.log(data)
					//check if this is the right way to swap lists?
					/*
					this.setState({
						recipe_list: data.recipes
					})*/
					//this.nextSection()
				})

			}
		} 
	}

    addIngredient = (ingredient) =>{
        //console.log(ingredient)
        let ingredients = [...this.state.ingredients, ingredient];
        this.setState({
            ingredients: ingredients
        })
        //keeping ingredient_tags parellel w/ ingredients
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
						{this.state.recipe_list.map((item,index) => (
							<div key={index}>
								<Card>
									<Card.Content>
										<Card.Header>{item}</Card.Header>
									</Card.Content>
								</Card>
							</div>
						))}
							
						
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
							<DisplayIngredients ingredients={this.state.ingredients} deletIngredient={this.deletIngredient}/>
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
								<Label>{item}</Label>
							</div>
						))}
						{this.state.recipe_list.map((item,index) => (
							<div key={index}>
								<Card>
									<Card.Content>
										<Card.Header>{item}</Card.Header>
									</Card.Content>
								</Card>
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