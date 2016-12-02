import React from 'react';
import GMap from './GMap.jsx';
import {Page} from 'react-onsenui';

export default class Moreview extends React.Component {
    constructor(){
    	super();
    }    
    
    render() {
        return (
        	<Page>
        		<GMap /> 
        		<p>More View Here!</p>
        	</Page>

       	)
        		
    }
}
