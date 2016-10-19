import React from 'react';
import $ from 'jquery';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Confirmation';
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
    	this.props.updateFormData(this.props.formData);
    }

    componentWillUnmount(){
    //    alert('sending request!');
        $.post('/api/order/request',this.props.formData,function(res){
            console.log(res);
        })
        .fail(function(err){
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
        	   </div>;
    }
}


