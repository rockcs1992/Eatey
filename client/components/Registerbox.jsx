import React from 'react';
import Inputfield from './Inputfield.jsx';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import 'onsenui';
import {Page, Input,Button,Toolbar} from 'react-onsenui';

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

    renderToolbar() {
        return (
          <Toolbar>
            <div className='center'>My app</div>
          </Toolbar>
        );
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
        return (
          <Page renderToolbar={this.renderToolbar}>
            <section style={{textAlign: 'center',marginTop : '20%',padding:'50px'}}>
              <p>
                <Input
                  value={this.state.firstname}
                  onChange={(event) => this.handleChange(event,'firstname')}
                  modifier='underbar'
                  float
                  placeholder='firstname' />
              </p>
              <p>
                <Input
                  value={this.state.lastname}
                  onChange={ (event) => this.handleChange(event,'lastname')}
                  modifier='underbar'
                  float
                  placeholder='lastname' />
              </p>
              <p>
                <Input
                  value={this.state.username}
                  onChange={ (event) => this.handleChange(event,'username')}
                  modifier='underbar'
                  float
                  placeholder='username' />
              </p>
              <p>
                <Input
                  value={this.state.email}
                  onChange={ (event) => this.handleChange(event,'email')}
                  modifier='underbar'
                  float
                  placeholder='email' />
              </p>
              <p>
                <Input
                  value={this.state.password}
                  onChange={ (event) => this.handleChange(event,'password')}
                  modifier='underbar'
                  type='password'
                  float
                  placeholder='password' />
              </p>
              {errorMessage}
              <p>
                <Button onClick={(event) => this.handleSubmit(event)}>Sign Up!</Button>
              </p>
              <p>Already have an account? <Link to="/">Sign In!</Link></p>
            </section>
          </Page>
        );
					
    }
}

