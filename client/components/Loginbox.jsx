import React from 'react';
import Inputfield from './Inputfield.jsx';
import { Link } from 'react-router';
import $ from 'jquery';
import { browserHistory } from 'react-router';

export default class Loginbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false,
            logindata : {},
            email : '',
            password:''
        };
    }

    handleChange(event,item){
        event.preventDefault();
        var newState = this.state;
        newState[item] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(e){
        e.preventDefault();
        var logindata = {
          email:this.state.email,
          password:this.state.password
        };
        if(this.validateInput()) {
            $.post('/api/login',logindata,function(res){
                console.log(res);
                localStorage.setItem('Eatey_userToken', res.token);
                localStorage.setItem('Eatey_username', res.username);
                browserHistory.push('/more');
            })
            .fail(function(err){
                console.log(err);
            });
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(logindata)
            // }).then( (res) => {
            //     console.log(res.json());
            // }).catch( err => {
            //     console.log(err);
            // });
        }
    }

    validateInput(){
        if (this.state.email === '') {
         this.setState({error: "Please enter emailAddress!"});
       } else if (this.state.password === '') {
         this.setState({error: "Please enter password!"});
       } else {
         this.setState({error: false});
         return true;
       }
    }

    renderError() {
        if(this.state.error) {
            return <div>
                    {this.state.error}
                   </div>
        }
    }

    render() {
        var errorMessage = this.renderError();
        return  <div id="login-box">
                    <form onSubmit={this.handleSubmit.bind(this)}>
            			<Inputfield value={this.state.email} type="text"
                                    onChange={(event) => {this.handleChange(event,'email')}}
                                    placeholder="Email Address"/>
    					<Inputfield value={this.state.password} type="password"
                                    onChange={(event) => {this.handleChange(event,'password')}}
                                    placeholder="Password" />
    					<input type="submit" value="Login!"></input>
    					<p>No account yet?<Link to="/register">Sign Up!</Link></p>
                    </form>
                    {errorMessage}
				</div>
					
    }
}


