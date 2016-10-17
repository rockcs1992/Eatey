import React from 'react';
import Navbutton from './Navbutton.jsx';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Dashboard';
    }
    render() {
        return  <div>
        			<Navbutton to="/eat" name="eat" />
        			<Navbutton to="/deliver" name="deliver" />
        			<Navbutton to="/more" name="more" />
        			{this.props.children}
				</div>;
    }
}
