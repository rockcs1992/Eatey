import React from 'react';
import ReactDOM from 'react-dom';
import Loginbox from './components/Loginbox.jsx';
import Registerbox from './components/Registerbox.jsx';
import Dashboard from './components/Dashboard.jsx';
import Eatview from './components/Eatview.jsx';
import Deliverview from './components/Deliverview.jsx';
import Moreview from './components/Moreview.jsx';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import socket from 'socket.io-client';
import {orange500} from 'material-ui/styles/colors';

var io = socket();





injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: orange500,
     primary1Color : '#e2793f'
    //  primary1Color: cyan500,
    // primary2Color: cyan700,
    // primary3Color: grey400,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
  appBar: {
    height: 100,
    color:orange500
  },
});
// class  Hello extends React.Component {
//     render() {
//         return <div>
//         			<p>Hell!</p>
//         			<Registerbox />

//               </div>
//     }
// }

const App = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router history={browserHistory}>
		    <Route path="/" component={Loginbox}/>
			<Route path="/register" component={Registerbox}/>
			<Route path="/dashboard" component={Dashboard} >
				<Route path="/eat" component={Eatview} />
				<Route path="/deliver" component={Deliverview} />
				<Route path="/more" component={Moreview} />
			</Route>
  		</Router>
	</MuiThemeProvider>
);
 
ReactDOM.render(
	<App />,
 	document.getElementById('app')
);
	


