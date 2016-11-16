import React from 'react';

export default class Orderitem extends React.Component {
	constructor(props) {
        super(props);
      	this.state = {
      		counter : 0
      	};
    }

    componentDidMount(){
    	this.timer = setInterval(this.tick.bind(this),1000);
	}

	tick(){
		this.setState({counter:++this.state.counter});
		console.log(this.state.counter); 
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

   

    render() {
    	const order = this.props.order;
        return (
            <tr>
            	<td>{order.restaurant}</td>
            	<td>{order.selectedFood}</td>
            	<td>{order.destination}</td>
            	<td>{order.waitingDuration}</td>
            	<td>{order.totalPrice}</td>
            	<td>{order.tips}</td>
                <td><button>Take Order!</button></td>
            </tr>
        );
    }
}

