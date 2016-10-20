import React from 'react';

export default class Restaurantlist extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
        	error : false,
        	selected : 0

        };
    }

    handleSelected(e){
    	this.setState({selected : Number(e.target.value)});
    }

    handleSubmit(e){
    	e.preventDefault();
    	if(this.state.selected === ''){
    		this.setState({error:"Please Select One Restaurant!"});
    	} else{
    		this.setState({error:false});
    		this.props.updateFormData({selectedRestaurantId:this.state.selected});
    	}
    	
    }

    renderError() {
    	if(this.state.error) {
    		return <div>
    				{this.state.error}
    				</div>
    	}
    }

    renderRestaurant(restaurant){
    	return  <div key={restaurant.id}>
    				<label>
    					<input type='radio' value={restaurant.id} onChange={this.handleSelected.bind(this)} 
    					checked={this.state.selected == restaurant.id} />{restaurant.name}
    				</label>
    			</div>
    } 


    
    render() {
        var errorMessage = this.renderError();
    	return <div>
    				<h3>Please choose one restaurant</h3>
    				{errorMessage}
    				<form onSubmit={this.handleSubmit.bind(this)}>
    				{	
    					this.props.restaurants.map( (restaurant) => {
    						return this.renderRestaurant(restaurant);
    					})
    				}
    					<input type="submit" value="next" /> 
    				</form>
    		   </div>
    }
}

