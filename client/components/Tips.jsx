import React from 'react';
import {Button,Input} from 'react-onsenui';

// class Tipbutton extends React.Component {
// 	render(){
// 		return <button onClick={this.props.handleClick(this.props.tipAmount)}>{this.props.tipAmount}</button>;
// 	}
// }

export default class Tips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	tips : 0,
        	inputvalue : ''
        };
    }

    handleClick(e){
    	e.preventDefault();
    	this.setState({tips : Number(e.target.value)});
    }

    handleChange(e){
    	this.setState({inputvalue : e.target.value,tips : Number(e.target.value)});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.updateFormData({tips:this.state.tips});
    }

    handleReturn(){
        this.props.returnToLastStep();
    }

    render() {
        return  <div>
        			<h2>Tips</h2>
        			<Button onClick={(event) => this.handleClick(event)}>1.0</Button>
                    <Button onClick={(event) => this.handleClick(event)}>1.5</Button>
                    <Button onClick={(event) => this.handleClick(event)}>2.0</Button>
                    <Button onClick={(event) => this.handleClick(event)}>2.5</Button>
        			<div>Custom Tip Amount : </div>
                    <Input
                        value={this.state.inputvalue}
                        onChange={(event) => this.handleChange(event)}
                        modifier='underbar'
                        float
                        placeholder='$' />
        			<h2>Tip Amount : {this.state.tips}</h2>
        			<Button onClick={() => this.handleReturn()}>previous</Button>
                    <Button onClick={(event) => this.handleSubmit(event)}>next</Button>
        		</div>;
    }
}

