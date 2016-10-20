import React from 'react';

export default class Menulist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	error : false,
        	selectedFood : [],
            totalprice : 0
        };
    }
    renderError(){
    	if(this.state.error) {
    		return <div>
    				{this.state.error}
    				</div>
    	}
    }

    renderMenu(food,index){
    	return  <tr key={index}>
                    <td>{food.item}</td>
                    <td>{food.unitprice}</td>
                    <td><input type="checkbox"  data-item={food.item} value={food.unitprice} onChange={this.handleSelected.bind(this)} /></td>
                </tr>
    }

    handleSelected(e){
       var selectedFood = this.state.selectedFood;
       var foodIndex = selectedFood.indexOf(e.target.dataset.item);
        if(e.target.checked){
            selectedFood.push(e.target.dataset.item);
            this.setState({totalprice : this.state.totalprice + Number(e.target.value),selectedFood : selectedFood});
        }else{
            selectedFood.splice(foodIndex,1);
            this.setState({totalprice : this.state.totalprice - Number(e.target.value),selectedFood : selectedFood});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.selectedFood.length === 0){
            this.setState({error:"Please Select Your Food!"});
        } else{
            this.setState({error:false});
            this.props.updateFormData({selectedFood:this.state.selectedFood,totalPrice : this.state.totalprice});
        }
    }

    handleReturn(){
        this.props.returnToLastStep();
    }

    render() {
        var errorMessage = this.renderError();
        return <div>
        			<h3>Please choose your meal</h3>
        			<table>
        				<thead>
        					<tr>
        						<th>ITEMS</th>
        						<th>UNIT PRICE</th>
        					</tr>
        				</thead>
        				<tbody>
        					{
        						this.props.menu.map( (food,index) => {
        							return 	this.renderMenu(food,index);
        						})
        					}
        				</tbody>
        			</table>
                    <h2>Total price:{this.state.totalprice}</h2>
                    {errorMessage}
                    <button onClick={this.handleSubmit.bind(this)}>next</button>
                    <button onClick={this.handleReturn.bind(this)}>previous</button>
        	   </div>;
    }
}


