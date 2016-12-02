import React from 'react';
import ReactDOM from 'react-dom';
import Loginbox from './components/Loginbox.jsx';
import Registerbox from './components/Registerbox.jsx';
import Dashboard from './components/Dashboard.jsx';
import Eatview from './components/Eatview.jsx';
import Deliverview from './components/Deliverview.jsx';
import Moreview from './components/Moreview.jsx';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect} from 'react-router';
import Test from './components/test.jsx';

ReactDOM.render(
  (
  <Router history={browserHistory}>
      <Route path="/" component={Loginbox}/>
    <Route path="/register" component={Registerbox}/>
    <Route path="/test" component={Test} />
    <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/eat" component={Eatview} />
       <Route path="/deliver" component={Deliverview} />
       <Route path="/more" component={Moreview} />  */}
    </Router>
    
  ),
  document.getElementById('app')
);