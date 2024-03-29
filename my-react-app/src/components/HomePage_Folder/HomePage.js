import React, {Component} from 'react'
import DisplayIngredients from '../AddRecipe_Folder/display_ingredients'
import './HomePage.css'
/*
    need to have better coding styles
*/
class HomePage extends Component{
    state = {
        radio_value: 'Title',
        title: '',
        ingredient: '',
        ingredients: []
    }
    handleChange = (input) => e =>{
        this.setState({[input]: e.target.value})
    }
    keyPress = (e) =>{
        if(e.keyCode === 13){
            if(e.target.name === 'Title'){
                this.props.history.push('/SearchResults',{name: 'title', data: this.state.title})
            }
            else{
                this.addIngredient()
            }
        }    
    }
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
    toSearchResults = () =>{
        let {radio_value} = this.state
        if(radio_value === 'Title'){
            this.props.history.push('/SearchResults',{name: 'title', data: this.state.title})
        }
        else{
            //radio_value === 'Ingredient'
            this.props.history.push('/SearchResults',{name: 'ingredients', data: this.state.ingredients})
        }

    }
    render(){
        let {radio_value} = this.state
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