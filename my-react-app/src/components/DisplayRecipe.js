import React from 'react'
import {Container,Header, TextArea, Segment} from 'semantic-ui-react';
/*
TODO: 
--go over conditional rendering I feel like my if's are messy and there could be a better way to render this page
--Switch away from react semantic ui and use my own CSS style sheet because of flexiblity
--Add Edit button (way later)

*/
const DisplayRecipe = () =>{
    let recipe = {
        title: 'Sun-Dried Romatoes',
        author: 'Cuoredicioccolato',
        src: 'YouTube',
        quick_description: 'Tasty home made Italian sun dried tomatoes!',
        total_time: '7 Days',
        prep_time: '30 minutes',
        cook_time: '7 Days',
        rating: '4/5',
        serving: '25',
        calories: '100',
        ingredients: ['25 Roma Tomatoes','1 Quarte Olive Oil','1 Clove of Garlic','2 tablespoons of Spices'],
        ingredient_tags: ['Roma Tomatoes','Olive Oil', 'Garlic','Spices'],
        directions: 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
		chef_notes: 'you can also do them in an oven at 125 f',
		url: 'https://www.youtube.com/watch?v=5yTWGjPdj-g'
    }
    let author = null
    let src = null
    if (recipe['author'] !== ''){
        author = <Container textAlign='center'><Header as='h3'>by {recipe['author']}</Header></Container>
    }
    if (recipe['src'] !== ''){
        src = <Container textAlign='center'><Header as='h3'>from {recipe['src']}</Header></Container>        
    }
    let descriptors_list = []
    if (recipe['total_time'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>Total Time: {recipe['total_time']}</Segment>]
    }
    if (recipe['prep_time'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>Prep Time: {recipe['prep_time']}</Segment>]
    }
    if (recipe['cook_time'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>Cook Time: {recipe['cook_time']}</Segment>]
    }
    if (recipe['rating'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>rating: {recipe['rating']}</Segment>]
    }
    if (recipe['serving'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>Serving: {recipe['serving']}</Segment>]
    }
    if (recipe['calories'] !== ''){
        descriptors_list = [...descriptors_list, <Segment compact>Calories Per Serving: {recipe['calories']}</Segment>]
    }
    let descriptors = descriptors_list.length ? (
        descriptors_list.map((item,index) => {
            return(
                <div key={index}>
                    {item}
                </div>
            )
        })
    ):(
        null
    )
    let ingredientsList = recipe['ingredients'].length ? (
        recipe['ingredients'].map((ingredient) => {
            return(
                <div key={ingredient}>
                    <Segment>
                        {ingredient}
                    </Segment>
                    {/**/}
                </div>
            )
        })
    ):(
        null
    )
    let url = null
    if (recipe['url'] !== ''){
        url = <Container textAlign='center'><a href={recipe['url']} target="_blank">{recipe['url']}</a></Container>
    }
    return(
        <div>
            <Container textAlign='center'><Header as='h1'>{recipe['title']}</Header></Container>
            {src}
            {author}
            <Segment.Group horizontal>
                {descriptors}
            </Segment.Group>
            {ingredientsList}
            <Container><TextArea value={recipe['directions']}/></Container>
            {url}
        </div>
    )
}
export default DisplayRecipe;