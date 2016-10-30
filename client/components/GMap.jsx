import React from 'react';

export default class GMap extends React.Component {
	constructor(){
    	super();
    }  
	componentDidMount(){
    	var pointA = new google.maps.LatLng(51.7519, -1.2578),
        pointB = new google.maps.LatLng(50.8429, -0.1313),
        myOptions = {
            zoom: 7,
            center: pointA
        },
        map = new google.maps.Map(this.mapElement, myOptions),
        directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        }),
        markerA = new google.maps.Marker({
            position: pointA,
            title: "point A",
            label: "A",
            map: map
        }),
        markerB = new google.maps.Marker({
            position: pointB,
            title: "point B",
            label: "B",
            map: map
        });
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
	}

	calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB){
		directionsService.route({
	        origin: pointA,
	        destination: pointB,
	        avoidTolls: true,
	        avoidHighways: false,
	        travelMode: google.maps.TravelMode.DRIVING
	    }, function (response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        } else {
	            window.alert('Directions request failed due to ' + status);
	        }
	    });
	}

	render(){
		return <div id="map" ref={(map) => this.mapElement = map} ></div>;
	}

	
}