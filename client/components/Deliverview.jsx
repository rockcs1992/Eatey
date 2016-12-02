import React from 'react';
import axios from 'axios';
import Orderitem from './Orderitem.jsx';
import {Page,ListItem, List, ListHeader, Toolbar,Icon,Button} from 'react-onsenui';
export default class Deliverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	orderLoaded : true,
            orders : []
        };
    }
    componentWillMount(){
    	var self = this;
        if(localStorage.Eatey_userToken){
            axios.defaults.headers.common.Authorization = localStorage.Eatey_userToken;
            axios.get('api/order/get')
            .then(function(res){
                self.setState({orderLoaded: true,orders : res.data});
            });
        }	
    }

    componentDidMount(){
        this.refresh = setInterval(this.getOrders.bind(this),5000);
    }

    componentWillUnmount(){
        clearInterval(this.refresh);
    }

    renderToolbar() {
        return (
          <Toolbar>
            <div className='center'>List</div>
          </Toolbar>
        );
    }

    getOrders(){
        var self = this;
        if(localStorage.Eatey_userToken){
            axios.get('api/order/get')
            .then(function(res){
                self.setState({orders : res.data});
            });
        }
    }

    renderRow(row, index) {
        const order = this.state.orders[index];
        return (
          <ListItem key={index}>
            <div className='center'>
              {order.tips}
            </div>
          </ListItem>
        );
    }

      render(){
        //To render List in this way is so dull!!! Need to find some way to fix this
        var refArray = [];
        for(let i=0;i<this.state.orders.length;i++){
            refArray[i] = i+1;
        }
        return (
            <Page renderToolbar={this.renderToolbar}>
                {
                     this.state.orderLoaded ? 
                        <List
                          dataSource={refArray}
                          renderRow={(row,index) => this.renderRow(row,index)}
                          renderHeader={() => <ListHeader>Current Available Orders : </ListHeader>}
                        />
                     : <p>Loading........</p>
                }
            </Page>
        );
      }

    // render() {
    //     return <Page>
    //     		<h3>All the orders available now : </h3>
    //     		{
    //     			this.state.orderLoaded ? 
    //     			<table>
	   //      			<thead>
	   //      				<tr>
	   //      					<th>Restaurant</th>
	   //      					<th>SelectedFood</th>
	   //      					<th>Destination</th>
	   //      					<th>WaitingDuration</th>
	   //      					<th>Total Price</th>
	   //      					<th>Tips</th>
	   //      				</tr>
	   //      			</thead>
    //     				<tbody>
	   //      			{
	   //      				this.state.orders.map( (order,index) => {
	   //      					return <Orderitem order={order} key={index} />
	   //      				})
	   //      			} 
	   //      			</tbody> 
    //     			</table>
    //     			: <p>Loading........</p>
    //     		}
    //     		</Page>;
    // }
}

// var MyPage = React.createClass({
//   renderToolbar: function() {
//     return (
//       <Toolbar>
//         <div className='center'>List</div>
//       </Toolbar>
//     );
//   },

//   renderRow(row, index) {
//     const x = 40 + Math.round(5 * (Math.random() - 0.5)),
//           y = 40 + Math.round(5 * (Math.random() - 0.5));

//     const names = ['Max', 'Chloe', 'Bella', 'Oliver', 'Tiger', 'Lucy', 'Shadow', 'Angel'];
//     const name = names[Math.floor(names.length * Math.random())];

//     return (
//       <ListItem key={index}>
//         <div className='left'>
//           <img src={`http://placekitten.com/g/${x}/${y}`} className='list__item__thumbnail' />
//         </div>
//         <div className='center'>
//           {name}
//         </div>
//       </ListItem>
//     );
//   },

//   render: function() {
//     return (
//       <Page renderToolbar={this.renderToolbar}>
//         <List
//           dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
//           renderRow={this.renderRow}
//           renderHeader={() => <ListHeader>Cute cats</ListHeader>}
//         />
//       </Page>
//     );
//   }
// });

// export default MyPage;