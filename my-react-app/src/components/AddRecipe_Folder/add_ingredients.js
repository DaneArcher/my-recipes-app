import React, {Component} from 'react'
//https://stackoverflow.com/questions/59032010/react-semantic-ui-add-call-to-action-on-button
//https://www.youtube.com/watch?v=9IhsYu4eKJ8

class AddIngredient extends Component{
    state = {
        ingredient_line: ''
    }
    handleChange = (e) =>{
        this.setState({
            ingredient_line: e.target.value
        })
    }
    handleClick = (e) =>{
        //e.preventDefault();
        this.props.addIngredient(this.state.ingredient_line)
        this.setState({
            ingredient_line:''
        })
    }
    keyPress = (e) =>{
        if(e.keyCode === 13){
            this.handleClick()
        }    
    }

    render(){
        return(
            <div className='add-ingredient'>
                <input type='text' value={this.state.ingredient_line} placeholder='Ingredient(s)' onChange={this.handleChange} onKeyDown={this.keyPress}/>
                <div className='btn-div' onClick={this.handleClick}>
                    <i className='fas fa-plus'/>
                </div>
            </div> 
        )
    }
}

export default AddIngredient