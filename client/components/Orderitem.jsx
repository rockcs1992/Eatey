import React from 'react';

export default class Orderitem extends React.Component {
	constructor(props) {
        super(props);
      
    }

   

    render() {
    	var order = this.props.order;
        return (
            <tr>
            	<td>{order.restaurant}</td>
            	<td>{order.selectedFood}</td>
            	<td>{order.destination}</td>
            	<td>{order.waitingDuration}</td>
            	<td>{order.totalPrice}</td>
            	<td>{order.tips}</td>
            </tr>
        );
    }
}

