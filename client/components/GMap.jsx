import React from 'react';
var Lat = 33.775898;
var Lng = -84.403926;
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

	// watchCurrentPosition() {
	// 	var self = this;
	//   this.positionTimer = navigator.geolocation.watchPosition(
	//     function (position) {
	//       self.setMarkerPosition(self.currentPositionMarker,position);
	//       console.log(position);
	//     });
	// }

	setMarkerPosition(marker, position) {
	  marker.setPosition(
	    new google.maps.LatLng(
	      position.coords.latitude,
	      position.coords.longitude)
	  );
	}

    displayAndWatch(position){
    	console.log(true);
		this.setCurrentPosition(position);
 		this.setMarkerPosition(this.currentPositionMarker,position);  
  	}

    locError(){
		alert("The current position could not be found!");
    }
	componentDidMount(){
		this.map = new google.maps.Map(this.mapElement, {
		    zoom: 18,
		    center: new google.maps.LatLng(Lat, Lng),
		//    mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		this.marker = new google.maps.Marker({
	    map: this.map,
	    position: new google.maps.LatLng(
	      Lat,
	      Lng
	    ),
	    icon : 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/2/2c/20100912230043!Nav-icon-untab.svg/120px-Nav-icon-untab.svg.png'
	  });
	  this.map.panTo(new google.maps.LatLng(
	    Lat,
	    Lng
	  ));
		// if (navigator.geolocation) {
		//     navigator.geolocation.watchPosition(this.displayAndWatch.bind(this),this.locError,{
		//     	enableHighAccuracy : true,
	 //            timeout : 10000,
	 //            maximumAge : 0
		//     });
		//   } else {
		//     alert("Your browser does not support the Geolocation API");
		//   }
		setInterval(this.test.bind(this),100);
 
	 }

	 test(){
 		Lat=Lat+0.000001;
 		Lng = Lng-0.000001;
	  this.marker.setPosition(
	    new google.maps.LatLng(
	      Lat,
	      Lng)
	  );
	  
		
	 }

	 componentWillUnmount(){
	 	navigator.geolocation.clearWatch(this.positionTimer);

	 }

	render(){
		return <div id="map" ref={(map) => this.mapElement = map} ></div>;
	}

	
}