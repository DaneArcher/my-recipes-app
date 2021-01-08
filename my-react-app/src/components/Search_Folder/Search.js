import React, {Component} from 'react'
//import './Search.css'
//import DisplayIngredients from '../AddRecipe_Folder/display_ingredients'
import Card from '../Card_Folder/Card'
//import DisplayRecipe from '../DisplayRecipe_Folder/DisplayRecipe'

/**
 * TODO: Need to work on styling for the search box and keeping that in the center when we add ingredients
 * next step with fetch code
 * call fetch code for case 1
 * add AddIngredients compontent in case 1
 * if the user goes back to case 1 and doesn't change anything keep the and goes back to case 2 keep the fetch from triggering
 * switch to case two then fetch from DB
 * remove inline style when displaying card
 * delete test data for recipe_list
 * need to remove display recipe step because it should be its own url!!!
 * figure out how to make my Card component have the onClick ability if feel like my solution is hacky at best
 */

class Search extends Component{
    state = {
        title: '',
        ingredients: [],
        recipe_list: [],
        recipe_id: 0,
        step: 1
    }
    componentDidMount(){
        console.log(this.props)
        //is setting the State needed?? because the data is saved in that location state
        let name = this.props.location.state.name
        if(name ==='title'){
            let title = this.props.location.state.data
            this.setState({
                title: title
            })
            /*
            let link = 'http://localhost:5000/search?title='
            link = link.concat(title)

            fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipe_list: data.recipes
                })
            })*/
        }
        else{
            //name === 'ingredients'
            let ingredients = this.props.location.state.data            
            this.setState({
                ingredients: ingredients
            })
            /*
            let link = 'http://localhost:5000/search?ingredients='
            let ingredient_str = ''
            for(let i = 0; i < ingredients.length; i++){
                ingredient_str = ingredient_str.concat(ingredients[i], ',')
            }
            ingredient_str = ingredient_str.slice(0, -1)
            link = link.concat(ingredient_str)
            
            fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipe_list: data.recipes
                })
            })*/
        }
    }
    nextStep = () =>{
        let {step} = this.state
        this.setState({
            step: step + 1
        })
    }
    previousStep = () =>{
		const {step} = this.state
		this.setState({
			step: step - 1
		})	
    }   
    /* 
    get_recipes = (name) =>{
        if (name === 'title'){
            let{title} = this.state
            let link = 'http://localhost:5000/search?title='
            link = link.concat(title)

            fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipe_list: data.recipes
                })
            })
        }
        else{
            //radio_value === 'ingredient'
            let{ingredients} = this.state
            let link = 'http://localhost:5000/search?ingredients='
            let ingredient_str = ''
            for(let i = 0; i < ingredients.length; i++){
                ingredient_str = ingredient_str.concat(ingredients[i], ',')
            }
            ingredient_str = ingredient_str.slice(0, -1)
            link = link.concat(ingredient_str)
            
            fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    recipe_list: data.recipes
                })
            })
        }
    }*/
    showRecipe = (id) =>{
        console.log(id)
        this.setState({
            recipe_id: id,
            step: this.state.step + 1
        })
    }
    render(){
        const {step} = this.state
        //console.log(this.props)
        switch(step){
            case 1:
                let {recipe_list} = this.state
                let results = recipe_list.length ? (
                    recipe_list.map((recipe,index) =>{
                        return(
                            <div key={index}>
                                <div onClick={() => {this.showRecipe(recipe.id)}}>
                                    <Card img={recipe.img}
                                        title={recipe.title}
                                        quick_description={recipe.quick_description}
                                        rating={recipe.rating}
                                        total_time={recipe.total_time}/>
                                </div>
                            </div>
                        )
                    })
                ):(
                    <p>loading list</p>
                )
                return(
                    <div>
                        <div style={{display:'flex'}}>
                            {results}
                        </div>
                    </div>
                )
            case 2:
                let {id} = this.state
                return(
                    <div>
                        {/*<DisplayRecipe id={this.state.recipe_id}/>*/}
                        {/*this.props.history.push('/recipe/{id}') */}
                        {/*if recipe is compleate */}
                        {/*this.props.history.push('/recipe/{id}',this.state.recipe_list[index]) */}
                        <button onClick={this.previousStep}>previous</button>
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

export default Search