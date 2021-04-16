import React, {Component} from 'react'
import './DisplayRecipe.css'

class DisplayRecipe extends Component{
    state = {
        recipe: null,
        edit_button: null,
        delete_button: null
    }
    componentDidMount(){
/*
        Case 1: Recipe ID is in parms and location state is null signifing do a fetch (URL is:/DisplayRecipe/:ID )
                -if fetch was a success display recipe else display no such recipe exists
                -on refresh check gloabel state. does this make case 2 redundent
        Case 2: Recipe ID is in parms and location state is not null signifing set component state = to location state(URL is:/DisplayRecipe/:ID) 
        Case 3: Full Recipe is sent through as a prop signifying that DisplayRecipe is being called as a chilled component in someother component set state equal to props.recipe
        Case 4: Error Something went wrong do something
        */
        let recipe = this.props.recipe
        if(recipe !== undefined){
            this.setState({
                recipe: this.props.recipe
            })
        }
        else{//if(recipe_id !== null) // fetch from db or from global cache
            
            let recipe_id = this.props.match.params.recipe_id
            let link = 'http://localhost:5000/full_recipe?recipe_id='        
            link = link.concat(recipe_id)
            
            let editR = '/edit/' // for flask
            editR = editR.concat(recipe_id)

            fetch(link)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.recipe)
                this.setState({
                    recipe: data.recipe,
                    edit_button: <button onClick= {()=>{this.props.history.push(editR,{recipe: this.state.recipe})}}>Edit Recipe</button>,
                    //deleteRecipe does not need to be wrapped in curly braces
                    delete_button: <button onClick= {()=>this.deleteRecipe(recipe_id)}>Delete Recipe</button>,

                })
            })
        }
    }
    deleteRecipe = (recipe_id) =>{
        fetch('http://localhost:5000/delete', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe_id),
            }).then(response => response.text())
            .then(text => {
                if(text === "response is good"){
                    this.props.history.push("/",{recipe_id: recipe_id})
                }
            })        
    }
    checkRecipe = () =>{
        let packaged_data = {}
        let {recipe} = this.state

        let [author, src, quick_description, img_link, chef_notes, url] = [null, null, null, null, null, null]
        let descriptors = ['level', 'total_time', 'prep_time', 'cook_time', 'inactive_time', 'servings', 'calories']
        packaged_data['descriptorList'] = []

        if(recipe['author'] !== ''){
            author=<h4 className='author'>By {recipe['author']}</h4>
        }
        packaged_data['author']=author

        if(recipe['src'] !== ''){
            src=<h4 className='src'> &nbsp; form {recipe['src']}</h4>
        }
        packaged_data['src']=src
        if(recipe['quick_description'] !== ''){
            quick_description=<p className='quick_description'>{recipe['quick_description']}</p>
        }
        packaged_data['quick_description']=quick_description
        
        if(recipe['img_link'] !== ''){
            img_link=<div className='img-wrapper'><img className='img' src={recipe['img_link']} alt={this.state.title}/></div>            
        }
        packaged_data['img_link']=img_link

        if(recipe.chef_notes !== ''){
            chef_notes= <p className='chef_notes'>{recipe.chef_notes}</p>
        }
        packaged_data['chef_notes']=chef_notes
        
        for(var i = 0; i < descriptors.length; i++){
            let name = descriptors[i]
            if (recipe[name] !== ''){
                let temp = <p className='descriptor-name'>{name}: <span className='descriptor-info'>{recipe[name]}</span></p>
                packaged_data.descriptorList.push(temp)
            }
        }
        if(recipe.url !== ''){
            //rel="noopener noreferrer" is used with target= '_blank' to keep the new window from gaining access
            //to my index.http target='_blank' opens the link in a new page for more info on this protection and 
            //risk https://mathiasbynens.github.io/rel-noopener/
            //hacky way to push url over to the right
            url = <div className='url'><div></div><a href={recipe['url']} target='_blank' rel="noopener noreferrer">{recipe['url']}</a></div>
        }
        packaged_data['url'] = url
        
        
        return packaged_data
    }

    render(){
        // recipe seems to not have the id in it need to FIX
        let {recipe} = this.state
        
        if(recipe != null){
            let packaged_data = this.checkRecipe()
            return(
                <div className='page'>
                    <div className='page-header'>
                        {packaged_data.img_link}
                        <div className='head-container'>
                            <h1 className='title'>{recipe.title}</h1>
                            <p className='rating'>{recipe.rating}</p>
                            <div className='author_src'>{packaged_data.author} {packaged_data.src}</div>               
                            <div className='descriptor-list'>
                                {packaged_data.descriptorList.map((item,index) => {
                                    return(
                                        <div key={index}>
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {packaged_data.quick_description}
                    <div className='instructions'>
                        <div className='ingredients'>
                            <h3>INGREDIENTS</h3>
                            <ul className='ingredients-list'>
                                {recipe.ingredients.map((item,index) =>{
                                    return(
                                        <li key={index}><p className='ingredient-item'>{item}</p></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='directions'>
                            <h3>DIRECTIONS</h3>
                            <p className='directions-text'>{recipe.directions}</p>
                        </div>
                    </div>
                    <div className='notes'>
                        <h3>Notes</h3>
                        {packaged_data.chef_notes}
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    {packaged_data.url}
                    {this.state.edit_button}
                    {this.state.delete_button}
                    <h1>testing delete</h1>
                    
                </div>
            )
        }
        else{
            return(
                <p>Loading Recipe Please wait</p> //add loading circle here and CENTER it
            )
        }
    }
}
export default DisplayRecipe
/*
let recipe = {
    title: 'Sun-Dried Romatoes',
    author: 'Cuoredicioccolato',
    src: 'YouTube',
    quick_description: 'Tasty home made Italian sun dried tomatoes! testing....... Tasty home made Italian sun dried tomatoes! testing....... Tasty home made Italian sun dried tomatoes! testing.......................................................................................................................................................................................................',
    total_time: '7 Days',
    prep_time: '30 minutes',
    cook_time: '7 Days',
    rating: '4/5',
    servings: '25',
    calories: '100',
    ingredients: ['25 Roma Tomatoes','1 Quarte Olive Oil','1 Clove of Garlic','2 tablespoons of Spicesssssssssssssssssssssssssssssssssssssssss'],
    ingredient_tags: ['Roma Tomatoes','Olive Oil', 'Garlic','Spices'],
    directions: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    chef_notes: 'you can also do them in an oven at 125 f',
    url: 'https://www.youtube.com/watch?v=5yTWGjPdj-g',
    img_link: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/10/14/0/FNK_SLOW_COOKER_HOT_CHOCOLATE_H_f_s4x3.jpg.rend.hgtvcom.826.620.suffix/1602696813966.jpeg'
}
*/