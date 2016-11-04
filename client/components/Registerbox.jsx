import React from 'react';
import Inputfield from './Inputfield.jsx';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Registerbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	error : false,
        	firstname : '',
        	lastname : '',
        	username : '',
        	email : '',
        	password : '',
        	confirmpassword : ''
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
        var registerdata = {
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          username : this.state.username,
          email : this.state.email,
          password : this.state.password
        };
        if(this.validateInput()) {
            $.post('/api/register',registerdata)
            .then(function(res){
                localStorage.setItem('Eatey_userToken', res.data.token);
                localStorage.setItem('Eatey_username', res.data.username);
                browserHistory.push('/more');
            })
            .catch(function(res){
                alert("User Already Exists!");
            });
        }
    }

    validateInput(){
        if (this.state.firstname === '') {
         this.setState({error: "Please enter firstname!"});
       } else if (this.state.lastname === '') {
         this.setState({error: "Please enter lastname!"});
       } else if (this.state.username === '') {
         this.setState({error: "Please enter username!"});
       }else if (this.state.email === '') {
         this.setState({error: "Please enter email!"});
       }else if (this.state.password === '') {
         this.setState({error: "Please enter password!"});
       }else if (this.state.confirmpassword === '') {
         this.setState({error: "Please confirm your password!"});
       }else if(this.state.password !== this.state.confirmpassword){
       	  this.setState({error : "Two passwords are not the same!"});
       }else {
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
        return  <div id="register-box">
        			<form onSubmit={this.handleSubmit.bind(this)}>
						<Inputfield value={this.state.firstname} type="text"
                                    onChange={(event) => {this.handleChange(event,'firstname')}}
                                    placeholder="First Name"/>
                        <Inputfield value={this.state.lastname} type="text"
                                    onChange={(event) => {this.handleChange(event,'lastname')}}
                                    placeholder="Last Name"/>
                        <Inputfield value={this.state.username} type="text"
                                    onChange={(event) => {this.handleChange(event,'username')}}
                                    placeholder="Username"/>
                        <Inputfield value={this.state.email} type="text"
                                    onChange={(event) => {this.handleChange(event,'email')}}
                                    placeholder="Email"/>
                        <Inputfield value={this.state.password} type="password"
                                    onChange={(event) => {this.handleChange(event,'password')}}
                                    placeholder="Password"/>
                        <Inputfield value={this.state.confirmpassword} type="password"
                                    onChange={(event) => {this.handleChange(event,'confirmpassword')}}
                                    placeholder="Confirm Password"/>
                        <input type='submit' value="Register" />

						<p>Already have an account?<Link to="/">Sign In!</Link></p>
					</form>
					{errorMessage}
				</div>
					
    }
}

