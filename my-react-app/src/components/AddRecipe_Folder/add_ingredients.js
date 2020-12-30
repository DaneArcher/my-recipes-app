import React, {Component} from 'react'
import { Form} from 'semantic-ui-react';
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

    render(){
        return(
            <div>
                <Form.Input
                    action={{
                        color: "green",
                        //labelPosition: "right",
                        icon: "plus",
                        //content: "Checkout",
                        onClick: this.handleClick
                    }}
                    placeholder="Search..."
                    label='Add Ingredient'
                    onChange={this.handleChange}
                    value={this.state.ingredient_line}
                    />
            </div>
        )
    }
}

export default AddIngredient