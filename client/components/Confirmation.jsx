import React from 'react';
import axios from 'axios';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken : localStorage.Eatey_userToken
        };

    }

    showFinalForm(form) {
    	var keys = Object.keys(form);
    	var data = keys.map((key,index) => {
    		return <p key={index}>{key}:{form[key]}</p>
    	})
    	return data;
    }

    handleSubmit(e){
    	e.preventDefault();
        if(!this.state.userToken){
            alert('Please Login Before Sending Food Request!');
        }
        else{
            this.props.updateFormData(this.props.formData);
        }
    	

    }

    handleReturn(){
        this.props.returnToLastStep();
    }

    componentWillUnmount(){
    //    alert('sending request!');
    //    var data = Object.assign(this.props.formData,{token : this.state.userToken});
        axios.post('/api/order/request',this.props.formData)
        .then(function(res){
            console.log(res.data);
        })
        .catch(function(err){
            console.log(err);
        })
    }

	render() {
		var formData = this.showFinalForm(this.props.formData);
        return <div>
        		<h2>Confirm Your Order : </h2>
        		<form onSubmit={this.handleSubmit.bind(this)}  >
        			 {formData}
        			<input type='submit'  />
        		</form>
                 <button onClick={this.handleReturn.bind(this)}>previous</button>
        	   </div>;
    }
}


