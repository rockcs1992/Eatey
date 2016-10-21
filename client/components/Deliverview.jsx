import React from 'react';
import $ from 'jquery';
import Orderitem from './Orderitem.jsx';

export default class Deliverview extends React.Component {
    constructor(props) {
        super(props);
        this.orders = [];
        this.state = {
        	orderLoaded : false
        };
    }
    componentWillMount(){
    	var self = this;
    	$.get('api/order/get')
    	.then(function(res){
    		self.orders = res;
			self.setState({orderLoaded: true});
    	});
    }
    render() {
        return <div>
        		<h3>All the orders available now : </h3>
        		{
        			this.state.orderLoaded ? 
        			<table>
	        			<thead>
	        				<tr>
	        					<th>Restaurant</th>
	        					<th>SelectedFood</th>
	        					<th>Destination</th>
	        					<th>WaitingDuration</th>
	        					<th>Total Price</th>
	        					<th>Tips</th>
	        				</tr>
	        			</thead>
        				<tbody>
	        			{
	        				this.orders.map( (order,index) => {
	        					return <Orderitem order={order} key={index} />
	        				})
	        			} 
	        			</tbody> 
        			</table>
        			: <p>Loading........</p>
        		}
        		</div>;
    }
}