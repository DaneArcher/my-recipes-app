import React, {Component} from 'react'
import Card from '../Card_Folder/Card'

/**
 * TODO: Need to work on styling for the search box and keeping that in the center when we add ingredients
 * remove inline style when displaying card
 * delete test data for recipe_list
 * figure out how to make my Card component have the onClick ability if feel like my solution is hacky at best
 */

class Search extends Component{
    state = {
        title: '',
        ingredients: [],
        recipe_list: [],
        recipe_id: 0
    }
    componentDidMount(){
        let name = this.props.location.state.name
        if(name ==='title'){
            let title = this.props.location.state.data
            this.setState({
                title: title
            })
            
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
            //name === 'ingredients'
            let ingredients = this.props.location.state.data            
            this.setState({
                ingredients: ingredients
            })
            
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
    }
    showRecipe = (id) =>{
        id = id.toString()
        this.props.history.push('/recipe/' + id)
    }
    render(){
        let {recipe_list} = this.state
        let results = recipe_list.length ? (
            recipe_list.map((recipe,index) =>{
                return(
                    <div key={index}>
                        <div onClick={() => {this.showRecipe(recipe.recipe_id)}}>
                            <Card img_link={recipe.img_link}
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
    }
}

export default Search