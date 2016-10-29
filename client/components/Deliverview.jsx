import React from 'react';
import axios from 'axios';
import Orderitem from './Orderitem.jsx';

export default class Deliverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	orderLoaded : false,
            orders : null
        };
    }
    componentWillMount(){
    	var self = this;
    	axios.get('api/order/get')
    	.then(function(res){
			self.setState({orderLoaded: true,orders : res.data});
    	});
    }

    componentDidMount(){
        setInterval(this.getOrders.bind(this),5000);
    }

    getOrders(){
        var self = this;
        axios.get('api/order/get')
        .then(function(res){
            self.setState({orders : res.data});
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
	        				this.state.orders.map( (order,index) => {
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