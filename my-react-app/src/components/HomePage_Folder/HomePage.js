import React, {Component} from 'react'
//import { Redirect } from 'react-router-dom'
import DisplayIngredients from '../AddRecipe_Folder/display_ingredients'
import { GlobalStateContext } from '../Context_Folder/GlobalStateContext'
import './HomePage.css'

class HomePage extends Component{
    static contextType = GlobalStateContext
    state = {
        radio_value: 'Title',
        title: '',
        ingredient: '',
        ingredients: []
    }
    handleChange = (input) => e =>{
        let browserkey = this.props.location.key
        this.setState({[input]: e.target.value})
        this.context.addToHistory(browserkey,input,e.target.value)
    }
    keyPress = (e) =>{
        if(e.keyCode === 13){
            if(e.target.name === 'Title'){
                this.toSearchResults()
            }
            else{
                this.addIngredient()
            }
        }    
    }
    addIngredient = () =>{
        let browserkey = this.props.location.key
        let ingredients = [...this.state.ingredients, this.state.ingredient];
        this.setState({
            ingredients: ingredients,
            ingredient: ''
        })
        this.context.addToHistory(browserkey,'ingredients',ingredients)
        this.context.addToHistory(browserkey,'ingredient','')
    }
    deleteIngredient = (index) =>{
        let browserkey = this.props.location.key
        let {ingredients} = this.state
        ingredients.splice(index,1)
        this.setState({ingredients})
        this.context.addToHistory(browserkey,'ingredients',ingredients)
    }
    toSearchResults = () =>{
        let {radio_value} = this.state
        if(radio_value === 'Title'){
            //this.props.history.push('/SearchResults',{name: 'title', data: this.state.title})
            let link = '/SearchResults/title/'
            link = link.concat(this.state.title)
            this.props.history.push(link)
        }
        else{
            //radio_value === 'Ingredient'
            //this.props.history.push('/SearchResults',{name: 'ingredients', data: this.state.ingredients})
            let {ingredients} = this.state 
            let link = '/SearchResults/ingredients/'
            let ingredient_str = ''
            for(let i = 0; i < ingredients.length; i++){
                ingredient_str = ingredient_str.concat(ingredients[i], ',')
            }
            ingredient_str = ingredient_str.slice(0, -1)
            link = link.concat(ingredient_str)

            this.props.history.push(link)
        }

    }
    componentDidMount(){
        //console.log(Object.keys(this.props.match.params).length === 0)
        //console.log(this.props)
        //console.log(this.props.location.key)

        let key = (this.props.location.key ? this.props.location.key : (this.props.history.location.key ? this.props.history.location.key : undefined))
        
        if(key === undefined){
            //let pathname = '/SearchResults/title/Miso'
            //console.log('in key undefined')
            this.props.history.replace('/reroute',{from: '/'})
            //console.log(this.props.location.key)
        }
        else{
            //set doo set up 
            //console.log('not in key undefined')
            let isInHistory = this.context.restoreHistory(key)
            if(isInHistory !== false){
                //I think this would work
                this.setState({
                    ...isInHistory
                })
            }
            else{
                this.context.pushToHistory(key,this.state)
            }
        }
    }
    render(){
        let {radio_value} = this.state
        //console.log(this.props)
        //console.log(this.props.location.key)
        //console.log(this.context.contextState.historyStack)
        //console.log(this.state)
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
                            <input type='text' className='input-area' placeholder='Crème Brûlée' value={this.state.title} onChange={this.handleChange('title')} name='Title' onKeyDown={this.keyPress}/>
                            <div className='btn-div' onClick={this.toSearchResults}>
                                <i className='fas fa-search'/>
                            </div>
                        </div>                            
                        ):(
                        <div>
                            <div className='search'>
                                <input type='text' className='input-area' placeholder='Ingredient(s)' value={this.state.ingredient} onChange={this.handleChange('ingredient')} name='Ingredient' onKeyDown={this.keyPress}/>
                                <div className='btn-div' onClick={this.addIngredient}>
                                    <i className='fas fa-plus'/>
                                </div>
                                <div><button onClick={this.toSearchResults}>search</button></div>
                            </div> 
                            <DisplayIngredients ingredients={this.state.ingredients} deleteIngredient={this.deleteIngredient}/>
                        </div>
                        )
                    }            
                </div>
            </div>
        )
    }
}

export default HomePage