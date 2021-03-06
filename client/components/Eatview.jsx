import React from 'react';
import Restaurantlist from './Restaurantlist.jsx';
import Menulist from './Menulist.jsx';
import Tips from './Tips.jsx';
import DestinationandTime from './DestinationandTime.jsx';
import Confirmation from './Confirmation.jsx';
import Success from './Success.jsx';
import { Link } from 'react-router';
import {Page} from 'react-onsenui';

export default class Eatview extends React.Component {
	constructor(){
		super();
		this.state = {
            currentUser : localStorage.Eatey_username,
			currentStep : 1,
			formData : {},
			restaurants : [
        		{
        			id : 0, 
        			name : 'TACO_BELL',
        			menu : [
        				{
        					item : 'steak taco',
        					unitprice : 2
        				},
        				{
        					item : 'rice_taco',
        					unitprice : 1.5
        				}
        			]
        		},
        		{
        			id : 1, 
        			name : 'PANDA',
        			menu : [
        				{
        					item : 'orange chicken',
        					unitprice : 5
        				},
        				{
        					item : 'pepper chicken',
        					unitprice : 5
        				},
					]
        		},
        		{
        			id : 2, 
        			name : 'SUBWAY',
        			menu : [
        				{
        					item : '6-inch sandwitch',
        					unitprice : 5
        				},
        				{
        					item : 'footlong sandwitch',
        					unitprice : 8
        				},
		 			]
        		},
        		{
        			id : 3, 
        			name : 'CHICK_FIL_A',
        			menu : [
        				{
        					item : 'chick-fil-a sandwitch',
        					unitprice : 3
        				},
        				{
        					item : 'spicy chicken sandwitch',
        					unitprice : 3.5
        				},
					]
        		}
        	]
		};
	}

	// componentWillMount(){
	// 	//get restaurant menus here
	// }

	updateFormData(data){
		var formData = this.state.formData;
		var newformData = Object.assign({},formData,data);
		this.setState({formData : newformData,currentStep:this.state.currentStep+1});
        console.log(this.state.formData);
	}

	returnToLastStep(){
		this.setState({currentStep : this.state.currentStep-1});
    }

    signOut(){
        localStorage.removeItem('Eatey_username');
        localStorage.removeItem('Eatey_userToken');
        this.setState({currentUser : ''});
    }
    
    render() {
        var title = this.state.currentUser  ? 
                    <div>
                        <p>Current User : {this.state.currentUser}</p>
                        <button onClick={this.signOut.bind(this)}>SignOut!</button>
                    </div>
                    : <p>Please <Link to='/'>Login!</Link></p>;
        return (
                <Page>
                    {title}
                    { (() => {
                        switch(this.state.currentStep){
                        	case 1 : return <Restaurantlist updateFormData={this.updateFormData.bind(this)} restaurants={this.state.restaurants} /> ;
                        	case 2 : return <Menulist updateFormData={this.updateFormData.bind(this)} 
                        							menu={this.state.restaurants[this.state.formData.selectedRestaurantId].menu}
                        							returnToLastStep={this.returnToLastStep.bind(this)} />;
                            case 3 : return <DestinationandTime updateFormData={this.updateFormData.bind(this)} 
                                                                returnToLastStep={this.returnToLastStep.bind(this)} />;
                            case 4 : return <Tips updateFormData={this.updateFormData.bind(this)} 
                                                    returnToLastStep={this.returnToLastStep.bind(this)} />;
                            case 5 : return <Confirmation formData={this.state.formData} updateFormData={this.updateFormData.bind(this)} 
                                                            returnToLastStep={this.returnToLastStep.bind(this)} />;
                            case 6 : return <Success />
                        }
                    })()}
                </Page>
            );
    }
}

