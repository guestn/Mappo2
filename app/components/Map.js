import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import {
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	StyleSheet,
	StatusBar
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

import mapboxApiKey from '../config';

Mapbox.setAccessToken(mapboxApiKey);

class Map extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			currentTracklog: this.props.currentTracklog,
	    center: {
	      latitude: 37.953335,
	      longitude: -122.329336
	    },
	    zoom: 16,
	    userTrackingMode: Mapbox.userTrackingMode.followWithHeading,
	    annotations: [
	    	{
		    	coordinates: [[38.29488085394479, -122.2661715265093],[37.29488085394479, -123.2661715265093]],
		    	type: 'polyline',
					title: 'This is marker 2',
					id: 'marker2',
					strokeWidth: 5,
					strokeColor: '#ff0000'
	    	}
	    ],
	  };
  }

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    //console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    //console.log('onRegionWillChange', location);
  };
  
  onUpdateUserLocation = (location) => {
    //	console.log('onUpdateUserLocation');
     this.setState({ center: {
	      latitude: location.latitude,
	      longitude: location.longitude
	  }, });
		this._map && this._map.setCenterCoordinate(location.latitude, location.longitude)
    return location;
  };
  onOpenAnnotation = (annotation) => {
  };
  onRightAnnotationTapped = (e) => {
    console.log('onRightAnnotationTapped', e);
  };
  onLongPress = (location) => {
    console.log('onLongPress', location);
  };
  onTap = (location) => {
    console.log('onTap', location);
  };
  onChangeUserTrackingMode = (userTrackingMode) => {
    this.setState({ userTrackingMode });
    console.log('onChangeUserTrackingMode', userTrackingMode);
  };

  componentWillMount() {
	  
	 
  }
  
  componentDidMount() {
	  //const tracklog = this.props.currentTracklog;
	  //should create new object not push to existing (mapbox docs)
	 // this.state.annotations

		this.setState({
			currentTracklog: this.props.currentTracklog,
			annotations: [ ...this.state.annotations,{
		      coordinates: [], 
		      type: 'polyline',
		      title: 'This is marker 4',
		      strokeWidth: 10,
		      id: 'tracklogLine',
		      strokeColor: '#ffff00'
	    }]
	  })
	  
	   
  }
  
  componentWillReceiveProps(nextProps) {
	  
	  /* If newprops, check if tracklog is empty - if so remove any annotation with id:tracklogLine */
	  /*.             if not empty - update the tracklogLine without mutation                       */
	  
	 	if (JSON.stringify(nextProps.currentTracklog) !== JSON.stringify(this.props.currentTracklog)) {
 
	  	if (nextProps.currentTracklog == []) {
		  	console.log('empty tracklog')
		  	this.setState({
					annotations: this.state.annotations.filter(a => a.id !== 'tracklogLine')
    		});
	  	} else {

			  var newAnnot = {
		      coordinates: nextProps.currentTracklog, 
		      type: 'polyline',
		      title: 'This is marker 4',
		      strokeWidth: 10,
		      id: 'tracklogLine',
		      strokeColor: '#ffff00'
			  }
		 		this.setState({
					currentTracklog: nextProps.currentTracklog,
		      annotations: this.state.annotations.map(annotation => {
		        if (annotation.id !== 'tracklogLine') { return annotation; }
		        return newAnnot })
		    });
	
			}
		}
  }

  componentWillUnmount() {
	  
  }

  render() {
  
    StatusBar.setBarStyle('light-content');
    return (
      <View style={S.mapContainer}>
        <MapView
          ref={map => { this._map = map; }}
          style={S.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotationsAreImmutable
          annotations={this.state.annotations}
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
          attributionButtonIsHidden={true}
          logoIsHidden={true}
        />
      <ScrollView style={S.test}>
      </ScrollView>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View>
        <Text onPress={() => this._map && this._map.setDirection(0)}>
          Set direction to N
        </Text>
        <Text onPress={() => this._map && this._map.setZoomLevel(6)}>
          Zoom out to zoom level 6
        </Text>
        <Text onPress={() => this.setState({ userTrackingMode: Mapbox.userTrackingMode.followWithHeading })}>
          Set userTrackingMode to followWithHeading
        </Text>
        <Text onPress={() => this._map && this._map.getCenterCoordinateZoomLevel((location)=> {
            console.log(location);
          })}>
          Get location
        </Text>
        <Text onPress={() => this._map && this._map.getDirection((direction)=> {
            console.log(direction);
          })}>
          Get direction
        </Text>
        <Text onPress={() => this._map && this._map.getBounds((bounds)=> {
            console.log(bounds);
          })}>
          Get bounds
        </Text>
        <Text>User tracking mode is {this.state.userTrackingMode}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({

});


function mapStateToProps(state) {
	return {
		searchedItems: state.searchedItems
	}
}

export default connect(mapStateToProps)(Map)
