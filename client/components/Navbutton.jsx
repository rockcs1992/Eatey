import React from 'react';
import {Link} from 'react-router';

export default class Navbutton extends React.Component {
    
    render() {
        return <button><Link {...this.props} activeClassName="active">{this.props.name}</Link></button>;
    }
}
