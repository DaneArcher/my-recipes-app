import React from 'react'
import DisplayIngredients from './display_ingredients'
import AddIngredient from './add_ingredients'
import './RecipeForm.css'


export const RecipeForm = ({recipe, handleChange, addIngredient, deleteIngredient}) =>{
    return(
        <>
            <div className='form-title'>
                <label>Title</label>
                <input name='title' value={recipe.title} onChange={handleChange} placeholder='Title'/>
            </div>
            <div className='form-author'>
                <label>Author</label>
                <input name='author' value={recipe.author} onChange={handleChange} placeholder='Author'/>
            </div>
            <div className='form-source'>
                <label>Source</label>
                <input name='src' value={recipe.src} onChange={handleChange} placeholder='Website, Book, Magazine, (optional)'/>
            </div>
            <div className='form-rating'>
                <label>Rating</label>
                <input name='rating' value={recipe.rating} onChange={handleChange} placeholder='4/5'/>
            </div>
            <div className='form-Q-description'>
                <label>Quick Descriptions</label>
                <textarea name='quick_description' value={recipe.quick_description} onChange={handleChange} placeholder='Toasted tortillas topped with flavorful black beans and fresh vegetables make a quick and delicious...'/>
            </div>
            <div className='descriptors'>
                <label>Total Time</label>
                <input name='total_time' value={recipe.total_time} onChange={handleChange} placeholder='X Hours or X Minutes'/>
                <label>Cook Time</label>
                <input name='cook_time' value={recipe.cook_time} onChange={handleChange} placeholder='X Hours or X Minutes'/>
                <label>Prep Time</label>
                <input name='prep_time' value={recipe.prep_time} onChange={handleChange} placeholder='X Hours or X Minutes'/>
                <label>Searvings</label>
                <input name='servings' value={recipe.servings} onChange={handleChange} placeholder='4'/>
                <label>Calories Per Serving</label>
                <input name='calories' value={recipe.calories} onChange={handleChange} placeholder='375'/>
            </div>
            <div className='form-instructions'>
                <div className='form-ingredients'>
                    <h4>INGREDIENTS</h4>
                    <AddIngredient addIngredient={addIngredient}/>
                    <DisplayIngredients ingredients={recipe.ingredients} deleteIngredient={deleteIngredient}/>
                </div>  
                <div className='form-directions'>
                    <h4>DIRECTIONS</h4>
                    <textarea name='directions' value={recipe.directions} onChange={handleChange} placeholder='Start by...'/>
                </div>
            </div>
            <div className='form-notes'>
                <label>Notes</label>
                <textarea name='chef_notes' value={recipe.chef_notes} onChange={handleChange} placeholder='Simmer for 10 minutes instead of 5 iminutes'/>
            </div>
            <div className='form-url'>
                <label>Website URL</label>
                <input name='url' value={recipe.url} onChange={handleChange} placeholder='www.foodnetwork.com'/>
            </div>
            <div className='form-img'>
                <label>Image Link</label>
                <input name='img_link' value={recipe.img_link} onChange={handleChange}/>
            </div>
        </>
    )
}

export const TagForm = ({ingredients, ingredient_tags, parsedIngr}) =>{
    return(
        <>
            {ingredients.map((item, index) =>(
                <div className='tagform'key={index}>
                    <label>{item}</label>
                    <input value={ingredient_tags[index]} onChange={(e) => {parsedIngr(e,index)}}/>
                </div>
            ))}

        </>
    )
}