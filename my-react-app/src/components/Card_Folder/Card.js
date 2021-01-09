import React, {Component} from 'react'
import './Card.css'

//I think this just needs to be a functional component and not a class component
//i may need to maintain state incase of an edit

//Need to study up on image fit
//text wrap around
//add stars
//reveal and hide description through click and animation
//font
//card changes size based off of moble screen
//Set title and description container to a fixed size
//add hover animation 
class Card extends Component{
    state = {click: false}
    render(){
        return(
            <div className='card'>
                <div className='img-container'>
                    <img src={this.props.img_link} alt={this.props.title}/>
                </div>
                <h3 className='card-title'>{this.props.title}</h3>
                <p className='card-discription'>{this.props.quick_description}</p>
                <div className='card-stats'>
                    <div className='card-rating'>{this.props.rating}</div>
                    <div className='card-time'>{this.props.total_time}</div>
                </div>
            </div>

        )
    }
}

export default Card