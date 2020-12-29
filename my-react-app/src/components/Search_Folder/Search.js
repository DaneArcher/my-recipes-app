import React, {Component} from 'react'
import './Search.css'
import DisplayIngredients from '../add_recipe_comp/display_ingredients'
import Card from '../Card_Folder/Card'

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
        radio_value: 'Title',
        title: '',
        ingredient: '',
        ingredients: [],
        recipe_list: [{
            img: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/10/14/0/FNK_SLOW_COOKER_HOT_CHOCOLATE_H_f_s4x3.jpg.rend.hgtvcom.826.620.suffix/1602696813966.jpeg',
            title: 'Slow-Cooker Hot Chocolate',
            quick_description: 'Whip up a big batch of perfect hot chocolate for your favorite friends with this effortless slow-cooker recipe. We used semisweet',
            rating: '5 out of 5',
            total_time: '2 hr 45 min', 
            id: 1
        },{
            img: '//food.fnr.sndimg.com/content/dam/images/food/fullset/2020/10/14/0/FNK_POINSETTIA_PINWHEEL_COOKIES_H_f_s4x3.jpg.rend.hgtvcom.966.725.suffix/1602697398437.jpeg',
            title: 'Slow-Cooker Hot Chocolate',
            quick_description: 'Whip up a big batch of perfect hot chocolate for your favorite friends with this effortless slow-cooker recipe. We used semisweet',
            rating: '5 out of 5',
            total_time: '2 hr 45 min',
            id: 2 
        }],
        recipe_id: 0,
        step: 1
    }
    /*
    onChange = e =>{
        this.setState({radio_value : e.target.value})
    }*/
    handleChange = (input) => e =>{
        this.setState({[input]: e.target.value})
    }
    /**need to come back to  */
    addIngredient = () =>{
        let ingredients = [...this.state.ingredients, this.state.ingredient];
        this.setState({
            ingredients: ingredients,
            ingredient: ''
        })
	 }
    deleteIngredient = (index) =>{
        let {ingredients} = this.state
        ingredients.splice(index,1)
        this.setState({ingredients})
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
    get_recipes = () =>{
        let{title, ingredients, radio_value} = this.state
        if (radio_value === 'Title'){
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
        this.nextStep()
    }
    showRecipe = (id) =>{
        console.log(id)
        this.setState({
            recipe_id: id,
            step: this.state.step + 1
        })
    }
    test = () =>{
        console.log('clicked')
    }
    render(){
        const {radio_value, step} = this.state
        switch(step){
            case 1:
                return(
                    <div className='search-container'>
                        <div className='search-box'>
                            <h1 className='search-title'>Recipe Search</h1>
                            <label className='search-radio'>
                                Search by Title
                                <input type='radio' 
                                    value='Title'
                                    checked={radio_value === 'Title'}
                                    onChange={this.handleChange('radio_value')}/>
                            </label>
                            <label className='search-radio'>
                                Search by Ingredient(s)
                                <input type='radio' 
                                    value='Ingredient'
                                    checked={radio_value === 'Ingredient'}
                                    onChange={this.handleChange('radio_value')}/>
                            </label>

                            {(radio_value === 'Title') ? 
                                (<div className='search'>
                                    <input type='text' className='input-area' placeholder='Crème Brûlée' value={this.state.title} onChange={this.handleChange('title')}/>
                                    <div className='btn-div' onClick={this.nextStep}>
                                        <i className='fas fa-search'/>
                                    </div>
                                </div>                            
                                ):(
                                <div>
                                    <div className='search'>
                                        <input type='text' className='input-area' placeholder='Ingredient(s)' value={this.state.ingredient} onChange={this.handleChange('ingredient')}/>
                                        <div className='btn-div' onClick={this.addIngredient}>
                                            <i className='fas fa-plus'/>
                                        </div>
                                        <div><button onClick={this.nextStep}>search</button></div>
                                    </div> 
                                    <DisplayIngredients ingredients={this.state.ingredients} deleteIngredient={this.deleteIngredient}/>
                                </div>
                                )
                            }            
                        </div>
                    </div>
                )
            case 2:
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
                        <button onClick={this.previousStep}>Previous</button>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <p>in case 3: {this.state.recipe_id}</p>
                        {/*<DisplayRecipe recipe_id={this.state.recipe_id}/>*/}
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