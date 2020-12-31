import React from 'react';
import './sub.css'
/*
TODO add word break to segment because if the word is to big
it will extend past the div*/
const DisplayIngredients = ({ingredients, deleteIngredient}) =>{
    const ingredientsList = ingredients.length ? (
        ingredients.map((ingredient,index) => {
            return(
                <div className='segment' key={index}>
                    {ingredient}
                    <button onClick={()=>{deleteIngredient(index)}}>
                        <i className='fas fa-times'></i>
                    </button>
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