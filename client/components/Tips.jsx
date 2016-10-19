import React from 'react';

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
    	console.log(this.state);
    }

    handleChange(e){
    	this.setState({inputvalue : e.target.value,tips : Number(e.target.value)});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.updateFormData({tips:this.state.tips});
        
    }

    render() {
        return  <div>
        			<h2>Tips</h2>
        			<button value='1' onClick={this.handleClick.bind(this)}>1</button>
        			<button value='1.5' onClick={this.handleClick.bind(this)}>1.5</button>
        			<button value='2' onClick={this.handleClick.bind(this)}>2</button>
        			<button value='2.5' onClick={this.handleClick.bind(this)}>2.5</button>
        			<div>Custom Tip Amount : </div>
        			<input type='text' value={this.state.inputvalue} onChange={this.handleChange.bind(this)} />
        			<h2>Tip Amount : {this.state.tips}</h2>
        			<button onClick={this.handleSubmit.bind(this)}>next</button>
        		</div>;
    }
}

