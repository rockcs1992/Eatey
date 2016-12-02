import React from 'react';

export default class Orderitem extends React.Component {
	constructor(props) {
        super(props);
      	this.state = {
      		counter : 0
      	};
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

