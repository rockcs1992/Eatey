import React from 'react';
import Inputfield from './Inputfield.jsx';
import { Link } from 'react-router';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const styles = {

    container: {
      height: '40%',
      width: '80%',
      position: 'absolute',
      top: '62%',
      transform: 'translateY(-50%) translateX(-50%)',
      left: '49.7%',
      textAlign: 'center',
      display: 'block',
      opacity: 1,
    },

    secondTextField: {
        position: 'absolute',
        margin: 'auto',
        left: 32,
        bottom: 160,
        width: '60%',
        fontSize: '30px',

        
    },

    underlineStyle: {
        borderColor: '#e2793f',
    },


    loginButton: {
      width: '85%',
      bottom: 50,
    },

    toggle: {
        width: 340,
        position: 'absolute',
        left: -54,
        bottom: 110,
    },

    thumbSwitched: {
        backgroundColor: '#e2793f',
    },

    trackOff: {
        backgroundColor: '#bdbdbd',
    },

    banner: {
        position: 'absolute',
        left: '51%',
        top: '24%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: 347.415,
        height: 190,
    },

    hyperlink: {
        fontSize: '13px',
        color: '#e2793f',
        textDecoration: 'none',
        position: 'absolute',
        margin: 'auto',
        left: 40,
        bottom: 25,


    },


};


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
        const backStyle = {
            backgroundImage: 'url("https://66.media.tumblr.com/dae4e966b2b13312aeccc317712d7932/tumblr_og1dbemJp71vk17rfo1_1280.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width:'100%', 
            height: '100%',
            position: 'absolute'
        };  

        return (

        <div style={backStyle}>
                <img src= 'http://66.media.tumblr.com/79b1879a3b497245c1b9105431c0a808/tumblr_og1vxsjFgn1vk17rfo1_500.png' 
                    style={styles.banner}
                />
                <Paper style={styles.container} zDepth={3}>
                    <br />
                    <TextField 
                        errorText={this.state.error?this.state.error:''} 
                        value={this.state.email} 
                        onChange={(event) => {this.handleChange(event,'email')}} 
                        hintText="Username/E-mail"
                        underlineFocusStyle={styles.underlineStyle}
                    />
                    <br />
                    <TextField 
                        errorText={this.state.error?this.state.error:''} 
                        value={this.state.password} 
                        onChange={(event) => {this.handleChange(event,'password')}} 
                        hintText="Password"
                        
                        underlineFocusStyle={styles.underlineStyle}
                        type="password"

                    />
                    <br />
                    <Toggle
                        label="Remember me"
                        style={styles.toggle}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackStyle={styles.trackOff}
                        trackSwitchedStyle={styles.trackOff}
                    />
                    <RaisedButton 
                        label="Login" 
                        onTouchTap={this.handleSubmit.bind(this)} 
                        style={styles.loginButton}
                        primary={true}
                        
                    />
                    <p><b><a href="/register" style={styles.hyperlink} target="_top" >Don't have an account? Sign up here</a></b></p>
                </Paper>
            </div>      
		);			
    }
}


