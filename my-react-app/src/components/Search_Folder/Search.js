import React, {Component} from 'react'
//import './Search.css'
//import DisplayIngredients from '../AddRecipe_Folder/display_ingredients'
import Card from '../Card_Folder/Card'
import { GlobalStateContext } from '../Context_Folder/GlobalStateContext'
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
    static contextType = GlobalStateContext
    //i don't think i need recipe_id in state but check it out later and title and ingredients
    state = {
        title: '',
        ingredients: [],
        recipe_list: [],
        recipe_id: 0,
    }
    componentDidMount(){

        let key = (this.props.location.key ? this.props.location.key : (this.props.history.location.key ? this.props.history.location.key : undefined))
        let {pathname} = this.props.location
        if(key === undefined){
            //check that url is propper then do replace
            this.props.history.replace(pathname)
        }
        else{
            //set doo set up 
            let isInHistory = this.context.restoreHistory(key)
            if(isInHistory !== false){
                console.log('in restore')
                //I think this would work
                this.setState({
                    ...isInHistory
                })
            }
            else{
                console.log('in fetch')
                this.context.pushToHistory(key,this.state)
                pathname = pathname.split('/')[2]
                //'/SearchResults/title/${this.state.title}'
                //is setting the State needed?? because the data is saved in that location state
                if(pathname ==='title'){
                    let title = this.props.match.params.title
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
                        this.context.addToHistory(key,'recipe_list',data.recipes)
                    })
                }
                else{
                    //name === 'ingredients'
                    let ingredients = this.props.match.params.ingredients            
                    this.setState({
                        ingredients: ingredients
                    })
                    
                    let link = 'http://localhost:5000/search?ingredients='
                    link = link.concat(ingredients)
                    
                    fetch(link)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            recipe_list: data.recipes
                        })
                        this.context.addToHistory(key,'recipe_list',data.recipes)
                    })
                }
                console.log(this.state)
            }
        }

    } 
    showRecipe = (id) =>{
        // console.log(id)
        // this.setState({
        //     recipe_id: id,
        //     step: this.state.step + 1
        // })
        //console.log(id)
        //console.log(typeof id)
        id = id.toString()
        this.props.history.push('/recipe/' + id)
    }
    render(){
        //console.log(this.props)
        console.log(this.context.contextState.historyStack)
        let {recipe_list} = this.state
        //console.log(recipe_list)
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