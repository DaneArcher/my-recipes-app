import React from 'react';
import {Button, Segment, Icon} from 'semantic-ui-react';


const DisplayIngredients = ({ingredients, deleteIngredient}) =>{
    const ingredientsList = ingredients.length ? (
        ingredients.map((ingredient,index) => {
            return(
                <div key={index}>
                    {/*
                    <p>{ingredient} <button onClick={()=>{deletIngredient(index)}}>X</button></p>
                   
                    */} 
                    <Segment>
                        {ingredient}
                        <Button 
                            floated='right' 
                            icon
                            onClick={()=>{deleteIngredient(index)}} 
                            color='red' 
                            size='mini'>
                            <Icon name='close'/>
                        </Button>
                    </Segment>
                    {/**/}
                </div>
            )
        })
    ):(
        <p>You have no ingredients added yet.</p>
    )

    return(
        <div>
            {ingredientsList}
        </div>
    )

}
export default DisplayIngredients