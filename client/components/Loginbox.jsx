import React from 'react';
import Inputfield from './Inputfield.jsx';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import 'onsenui';
import {Page, Input,Button,Toolbar, Switch} from 'react-onsenui';




export default class Loginbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error : false,
            checked : false,
            logindata : {},
            email : '',
            password:''
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

    handleSwitch(e){
        this.setState({checked: e.target.checked});
    }

    handleSubmit(e){
        e.preventDefault();
        var logindata = {
          email:this.state.email,
          password:this.state.password
        };
        if(this.validateInput()) {
            axios.post('/api/login',logindata)
            .then(function(res){
                localStorage.setItem('Eatey_userToken', res.data.token);
                localStorage.setItem('Eatey_username', res.data.username);
                browserHistory.push('/more');
            })
            .catch(function(err){
                console.log(err);
            });
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

      return (
        <Page renderToolbar={this.renderToolbar}>
          <section style={{textAlign: 'center',marginTop : '50%'}}>
            <p>
              <Input
                value={this.state.email}
                onChange={(event) => this.handleChange(event,'email')}
                modifier='underbar'
                float
                placeholder='Username' />
            </p>
            <p>
              <Input
                value={this.state.password}
                onChange={ (event) => this.handleChange(event,'password')}
                modifier='underbar'
                type='password'
                float
                placeholder='Password' />
            </p>
            {errorMessage}
            <span style={{margin : '5px', display:'inline-block'}}>
              Remember Me!
            </span>
            <span>
              <Switch checked={this.state.checked} onChange={(event)=> this.handleSwitch(event)} />
            </span>
            <p>
              <Button onClick={(event) => this.handleSubmit(event)}>Sign in</Button>
            </p>
            <p>No account yet? <Link to="/register">Sign Up!</Link></p>
          </section>
        </Page>
      );

    }
}