import React from 'react';
import Inputfield from './Inputfield.jsx';
import {Button,Input} from 'react-onsenui';

export default class DestinationandTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	error : false,
        	destination : '',
        	waitingDuration : ''
        };
    }

    handleChange(event,item){
        event.preventDefault();
        var newState = this.state;
        newState[item] = event.target.value;
        this.setState(newState);
    }

    handleReturn(){
        this.props.returnToLastStep();
    }

    renderError() {
        if(this.state.error) {
            return <div>
                    {this.state.error}
                   </div>
        }
    }

    validateInput(){
        if (this.state.destination === '') {
         this.setState({error: "Please enter your destination!"});
       } else if (this.state.waitingDuration === '') {
         this.setState({error: "Please enter waitingDuration!"});
       } else {
         this.setState({error: false});
         return true;
       }
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.destination === ''){
            this.setState({error:"Please enter your destination!"});
        } else if(this.state.waitingDuration === ''){
        	this.setState({error:"Please enter waitingDuration!"});
        }else{
            this.setState({error:false});
            this.props.updateFormData({destination:this.state.destination,waitingDuration : this.state.waitingDuration});
        }
    }

    render() {
    	var errorMessage = this.renderError();
        return <div>
        		<span>Destination : <Inputfield value={this.state.destination} type="text"
                                    onChange={(event) => {this.handleChange(event,'destination')}}
                                    /></span>
                <span>Waiting Duration : <Inputfield value={this.state.waitingDuration} type="text"
                                    onChange={(event) => {this.handleChange(event,'waitingDuration')}}
                                    /></span>
                {errorMessage}
                <Button onClick={() => this.handleReturn()}>previous</Button>
                <Button onClick={(event) => this.handleSubmit(event)}>next</Button>
        		</div>;
    }
}


