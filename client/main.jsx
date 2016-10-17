import React from 'react';
import ReactDOM from 'react-dom';
import Loginbox from './components/Loginbox.jsx';
import Registerbox from './components/Registerbox.jsx';
import Dashboard from './components/Dashboard.jsx';
import Eatview from './components/Eatview.jsx';
import Deliverview from './components/Deliverview.jsx';
import Moreview from './components/Moreview.jsx';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';


// class  Hello extends React.Component {
//     render() {
//         return <div>
//         			<p>Hell!</p>
//         			<Registerbox />

//               </div>
//     }
// }

ReactDOM.render(
	(
	<Router history={browserHistory}>
	    <Route path="/" component={Loginbox}/>
		<Route path="/register" component={Registerbox}/>
		<Route path="/dashboard" component={Dashboard} >
			<Route path="/eat" component={Eatview} />
			<Route path="/deliver" component={Deliverview} />
			<Route path="/more" component={Moreview} />
		</Route>
  	</Router>
 		
	),
	document.getElementById('app'));


