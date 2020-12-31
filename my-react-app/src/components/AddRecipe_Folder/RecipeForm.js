import React from 'react'
import DisplayIngredients from './display_ingredients'
import AddIngredient from './add_ingredients'


export const RecipeForm = ({recipe, handleChange, addIngredient, deleteIngredient}) =>{
    return(
        <>
            <label>Title</label>
            <input name='title' value={recipe.title} onChange={handleChange} placeholder='Title'/>
            <label>Author</label>
            <input name='author' value={recipe.author} onChange={handleChange} placeholder='Author'/>
            <label>Source</label>
            <input name='src' value={recipe.src} onChange={handleChange} placeholder='Website, Book, Magazine, (optional)'/>
            <label>Quick Descriptions</label>
            <textarea name='quick_description' value={recipe.quick_description} onChange={handleChange} placeholder='Toasted tortillas topped with flavorful black beans and fresh vegetables make a quick and delicious...'/>
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
            <label>Rating</label>
            <input name='rating' value={recipe.rating} onChange={handleChange} placeholder='4/5'/>
            <DisplayIngredients ingredients={recipe.ingredients} deleteIngredient={deleteIngredient}/>
            <AddIngredient addIngredient={addIngredient}/>  
            <label>Directions</label>
            <textarea name='directions' value={recipe.directions} onChange={handleChange} placeholder='Start by...'/>
            <label>Notes</label>
            <textarea name='chef_notes' value={recipe.chef_notes} onChange={handleChange} placeholder='Simmer for 10 minutes instead of 5 iminutes'/>

            <label>Website URL</label>
            <input name='url' value={recipe.url} onChange={handleChange} placeholder='www.foodnetwork.com'/>
            <label>Image Link</label>
            <input name='img_link' value={recipe.img_link} onChange={handleChange}/>
        </>
    )
}

export const TagForm = ({ingredients, ingredient_tags, parsedIngr}) =>{
    return(
        <>
            {ingredients.map((item, index) =>(
                <div key={index}>
                    <label>{item}</label>
                    <input value={ingredient_tags[index]} onChange={(e) => {parsedIngr(e,index)}}/>
                </div>
            ))}

        </>
    )
}