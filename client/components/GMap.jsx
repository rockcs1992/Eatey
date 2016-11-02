import React from 'react';

export default class GMap extends React.Component {
	constructor(){
    	super();


    } 

    setCurrentPosition(pos) {
	  this.currentPositionMarker = new google.maps.Marker({
	    map: this.map,
	    position: new google.maps.LatLng(
	      pos.coords.latitude,
	      pos.coords.longitude
	    ),
	    title: "Current Position"
	  });
	  this.map.panTo(new google.maps.LatLng(
	    pos.coords.latitude,
	    pos.coords.longitude
	  ));
	} 

	watchCurrentPosition() {
		var self = this;
	  this.positionTimer = navigator.geolocation.watchPosition(
	    function (position) {
	      self.setMarkerPosition(self.currentPositionMarker,position);
	    });
	}

	setMarkerPosition(marker, position) {
	  marker.setPosition(
	    new google.maps.LatLng(
	      position.coords.latitude,
	      position.coords.longitude)
	  );
	}

    displayAndWatch(position){
		this.setCurrentPosition(position);
 		this.watchCurrentPosition();    
  	}

    locError(){
		alert("The current position could not be found!");
    }
	componentDidMount(){
		this.map = new google.maps.Map(this.mapElement, {
		    zoom: 15,
		    center: new google.maps.LatLng(33.775898, -84.403926),
		//    mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(this.displayAndWatch.bind(this),this.locError);
		  } else {
		    alert("Your browser does not support the Geolocation API");
		  }
 //    	var pointA = new google.maps.LatLng(33.775999, -84.405293),
 //        pointB = new google.maps.LatLng(33.777476, -84.396159),
 //        myOptions = {
 //            zoom: 7,
 //            center: pointA
 //        },
 //        map = new google.maps.Map(this.mapElement, myOptions),
 //        directionsService = new google.maps.DirectionsService(),
 //        directionsDisplay = new google.maps.DirectionsRenderer({
 //            map: map
 //        }),
 //        markerA = new google.maps.Marker({
 //            position: pointA,
 //            title: "point A",
 //            label: "A",
 //            map: map
 //        }),
 //        markerB = new google.maps.Marker({
 //            position: pointB,
 //            title: "point B",
 //            label: "B",
 //            map: map
 //        });
 //        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
	// }

	// calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB){
	// 	directionsService.route({
	//         origin: pointA,
	//         destination: pointB,
	//         avoidTolls: true,
	//         avoidHighways: false,
	//         travelMode: google.maps.TravelMode.WALKING
	//     }, function (response, status) {
	//         if (status == google.maps.DirectionsStatus.OK) {
	//             directionsDisplay.setDirections(response);
	//         } else {
	//             window.alert('Directions request failed due to ' + status);
	//         }
	//     });
	 }

	 componentWillUnmount(){
	 	navigator.geolocation.clearWatch(this.positionTimer);

	 }

	render(){
		return <div id="map" ref={(map) => this.mapElement = map} ></div>;
	}

	
}