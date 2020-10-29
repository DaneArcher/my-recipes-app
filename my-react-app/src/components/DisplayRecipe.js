import React, {Component} from 'react'
import {Container,Header, TextArea, Segment} from 'semantic-ui-react';
/*
TODO: 
--go over conditional rendering I feel like my if's are messy and there could be a better way to render this page
--Switch away from react semantic ui and use my own CSS style sheet because of flexiblity
--Add Edit button (way later)
--indents got mest up some how fix later 
*/
class DisplayRecipe extends Component{
    state = {
        recipe: null
    }
    componentDidMount(){
        console.log('component did mount')
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
        this.setState({recipe})
        /*
        console.log(this.props.recipe_id)
        let link = '/get_recipe_by_id?id='
        let recipe_id = this.props.recipe_id        
        link = link.concat(recipe_id)

        fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                recipe: data.recipe
            })
        */
    }
    check = () =>{
        let packaged_data = []
        let {recipe} = this.state       
        let author = null
        let src = null
        if (recipe['author'] !== ''){
            author = <Container textAlign='center'><Header as='h3'>by {recipe['author']}</Header></Container>
        }
        packaged_data.push(author)
        if (recipe['src'] !== ''){
            src = <Container textAlign='center'><Header as='h3'>from {recipe['src']}</Header></Container>        
        }
        packaged_data.push(src)

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
        packaged_data.push(descriptors)
        let ingredientsList = recipe['ingredients'].length ? (
            recipe['ingredients'].map((ingredient) => {
                return(
                    <div key={ingredient}>
                        <Segment>
                            {ingredient}
                        </Segment>
                    </div>
                )
            })
        ):(
            null
        )
        packaged_data.push(ingredientsList)
        let url = null
        if (recipe['url'] !== ''){
            //rel="noopener noreferrer" is used with target= '_blank' to keep the new window from gaining access
            //to my index.http target='_blank' opens the link in a new page for more info on this protection and 
            //risk https://mathiasbynens.github.io/rel-noopener/
            url = <Container textAlign='center'><a href={recipe['url']} target='_blank' rel="noopener noreferrer">{recipe['url']}</a></Container>
        }
        packaged_data.push(url)
        return(packaged_data)
    }
   render(){
       console.log('in render')
       let {recipe} = this.state
       if(recipe != null){
            let packaged_data = this.check()
            let author = packaged_data[0]
            let src = packaged_data[1]
            let descriptors = packaged_data[2]
            let ingredientsList = packaged_data[3]
            let url = packaged_data[4]
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
       else{
           return(
               <p>Loading Recipe please wait</p>
           )
       }       
   }
}
export default DisplayRecipe;