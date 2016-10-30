import React from 'react';
import GMap from './GMap.jsx';

export default class Moreview extends React.Component {
    constructor(){
    	super();
    }    
    
    render() {
        return (
        	<div>
        		<GMap />
        		<p>More View Here!</p>
        	</div>

       	)
        		
    }
}
