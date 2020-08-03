import React, {Component} from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import DisplayRecipe from './add_recipe_comp/display_recipe.js'
import AddIngredient from './add_recipe_comp/add_ingredients.js'
/*
TODO: 
	--check to see if user added title, ingredients, and directions before moving on (required fields)
	--handle deleting ingredents and how that effects ingredents_tags
	--in case of a user is switching between the add recipe pg and the parsing page make sure not to redue or over write work
	--in case user returns to add recipe pg to change ingredents make sure that the equivalent paring tab is updated
	--parsed ingredets by user make sure their are no spaces in front or and the end and any bad characters withing the parsted ingredents i.e. numbers and symbols
	--check for duplicates ingredents and parsed ingredents
	--check for strings of blank spaces  
	--if user is edeting ingredents in a subminted recipe make sure that recipe is removed from old ingredent_tag
	--delete button
	--previous button
	--option between adding recipie by hand and link
	--multiple ingredent_tags for one ingredent
	--recipe type check boxes i.e lunch, desert, drinks....
*/
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
        serving: '',
        calories: '',
        ingredients: [],
        ingredient_tags: [],
        directions: '',
		  chef_notes: '',
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
	 parsedIngr = (index) => e =>{
		//console.log('hello') 
		let {ingredient_tags} = this.state
		ingredient_tags[index] = e.target.value
		this.setState({
			ingredient_tags
		})
		console.log(this.state.ingredients)
		console.log(this.state.ingredient_tags)
	 }

    render(){
        const {step} = this.state
        switch(step){
            case 1:
					return(
						<div>
							 <h1>Testing</h1>
							 <Form>
								  <Form.Field width={3}> 
										<label>Title</label>
										<Input
											 placeholder='Title'
											 onChange = {this.handleChange('title')}
										/>                        
								  </Form.Field>
								  <Form.Field> 
										<label>Author</label>
										<Input
											 placeholder='Author'
											 onChange = {this.handleChange('author')}
										/>                        
								  </Form.Field>
								  <Form.Field> 
										<label>Source</label>
										<Input
											 placeholder='Website, Book, Magazine, (optional)'
											 onChange = {this.handleChange('src')}
										/>                        
								  </Form.Field>
								  <Form.Field> 
										<label>Quick Description</label>
										<Input
											 placeholder='Toasted tortillas topped with flavorful black beans and fresh vegetables make a quick and delicious...'
											 onChange = {this.handleChange('quick_description')}
										/>                        
								  </Form.Field>
								  <Form.Group widths='equal'>
										<Form.Field> 
											 <label>Total Time</label>
											 <Input
												  placeholder='2 hours'
												  onChange = {this.handleChange('total_time')}
											 />                        
										</Form.Field>
										<Form.Field> 
											 <label>Prep Time</label>
											 <Input
												  placeholder='30 minutes'
												  onChange = {this.handleChange('prep_time')}
											 />                        
										</Form.Field>
										<Form.Field> 
											 <label>Cook Time</label>
											 <Input
												  placeholder='1 hour and 30 minutes'
												  onChange = {this.handleChange('cook_time')}
											 />                        
										</Form.Field>
								  </Form.Group>
								  <Form.Group widths='equal'>
										<Form.Field> 
											 <label>Rating</label>
											 <Input
												  placeholder='8/10'
												  onChange = {this.handleChange('rating')}
											 />                        
										</Form.Field>
										<Form.Field> 
											 <label>Serving</label>
											 <Input
												  placeholder='4'
												  onChange = {this.handleChange('serving')}
											 />                        
										</Form.Field>
										<Form.Field> 
											 <label>Calories</label>
											 <Input
												  placeholder='375 per serving'
												  onChange = {this.handleChange('calories')}
											 />                        
										</Form.Field>
								  </Form.Group>
								</Form>
								  <DisplayRecipe ingredients={this.state.ingredients} deletIngredient={this.deletIngredient}/>
								<Form>
								  <AddIngredient addIngredient={this.addIngredient}/>
								  <Form.TextArea label='Directions' onChange = {this.handleChange('directions')} rows="8" placeholder='Start by...'/>
								  <Form.TextArea label='Chef Notes' onChange = {this.handleChange('chef_notes')} rows="3" placeholder='Simmer for 10 minutes instead of 5 iminutes'/>
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
							<p>In step 2</p>
							{this.state.ingredients.map((item, index) => (
								<div key={index}>
									<Input label={item} onChange={this.parsedIngr(index)} value={this.state.ingredient_tags[index]}/>
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

export default AddRecipe;