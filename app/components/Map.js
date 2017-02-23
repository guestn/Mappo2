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

//const accessToken = 'pk.eyJ1IjoiZ3Vlc3RuaWNob2xhcyIsImEiOiJjaXpkaGljeXgyNXB1Mnd0ZWc2M2ZhOGg1In0.DL7a1eiXduA15aWYWdGijg';
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
    //console.log('onOpenAnnotation', annotation);
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
	     // coordinates: [[38.29488085394479, -122.2661715265093],[39.29488085394479, -121.2661715265093]],
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
 
	  	console.log('NEWPROPS!',nextProps.currentTracklog)
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
        {this._renderButtons()}
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


/*
<Text onPress={() => this._map && this._map.setCenterCoordinate(48.8589, 2.3447)}>
          Go to Paris at current zoom level {parseInt(this.state.currentZoom)}
        </Text>
        <Text onPress={() => this._map && this._map.setCenterCoordinateZoomLevel(35.68829, 139.77492, 14)}>
          Go to Tokyo at fixed zoom level 14
        </Text>
        <Text onPress={() => this._map && this._map.easeTo({ pitch: 30 })}>
          Set pitch to 30 degrees
        </Text>
  <Text onPress={() => this._map && this._map.selectAnnotation('marker1')}>
          Open marker1 popup
        </Text>
        <Text onPress={() => this._map && this._map.deselectAnnotation()}>
          Deselect annotation
        </Text>
        <Text onPress={this.removeMarker2}>
          Remove marker2 annotation
        </Text>
        <Text onPress={() => this.setState({ annotations: [] })}>
          Remove all annotations
        </Text>
        <Text onPress={() => {
            Mapbox.addOfflinePack({
              name: 'test',
              type: 'bbox',
              bounds: [0, 0, 0, 0],
              minZoomLevel: 0,
              maxZoomLevel: 0,
              metadata: { anyValue: 'you wish' },
              styleURL: Mapbox.mapStyles.dark
            }).then(() => {
              console.log('Offline pack added');
            }).catch(err => {
              console.log(err);
            });
        }}>
          Create offline pack
        </Text>
        <Text onPress={() => {
            Mapbox.getOfflinePacks()
              .then(packs => {
                console.log(packs);
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Get offline packs
        </Text>
        <Text onPress={() => {
            Mapbox.removeOfflinePack('test')
              .then(info => {
                if (info.deleted) {
                  console.log('Deleted', info.deleted);
                } else {
                  console.log('No packs to delete');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Remove pack with name 'test'
        </Text>
 <Text onPress={this.addNewMarkers}>
          Add new marker
        </Text>
        <Text onPress={this.updateMarker2}>
          Update marker2
        </Text>
              <Text onPress={() => this._map && this._map.setVisibleCoordinateBounds(40.712, -74.227, 40.774, -74.125, 100, 0, 0, 0)}>
          Set visible bounds to 40.7, -74.2, 40.7, -74.1
        </Text>
*/

const styles = StyleSheet.create({

});


function mapStateToProps(state) {
	return {
		searchedItems: state.searchedItems
	}
}

export default connect(mapStateToProps)(Map)


/*
class Map extends Component {
	constructor(props) {
		super(props);
	
	
		this.state = {
	    center: {
	      latitude: 40.72052634,
	      longitude: -73.97686958312988
	    },
	    zoom: 11,
	    userTrackingMode: Mapbox.userTrackingMode.none,
	    annotations: [{
	      coordinates: [40.72052634, -73.97686958312988],
	      type: 'point',
	      title: 'This is marker 1',
	      subtitle: 'It has a rightCalloutAccessory too',
	      rightCalloutAccessory: {
	        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
	        height: 25,
	        width: 25
	      },
	      annotationImage: {
	        source: { uri: 'http://www.iconsdb.com/icons/preview/orange/filled-flag-xl.png' },
	        height: 25,
	        width: 25
	      },
	      id: 'marker1'
	    }, {
	      coordinates: [40.714541341726175,-74.00579452514648],
	      type: 'point',
	      title: 'Important!',
	      subtitle: 'Neat, this is a custom annotation image',
	      annotationImage: {
	        source: { uri: 'http://www.iconsdb.com/icons/preview/orange/filled-flag-xl.png' },
	        height: 25,
	        width: 25
	      },
	      id: 'marker2'
	    }, {
	      coordinates: [[40.76572150042782,-73.99429321289062],[40.743485405490695, -74.00218963623047],[40.728266950429735,-74.00218963623047],[40.728266950429735,-73.99154663085938],[40.73633186448861,-73.98983001708984],[40.74465591168391,-73.98914337158203],[40.749337730454826,-73.9870834350586]],
	      type: 'polyline',
	      strokeColor: '#00FB00',
	      strokeWidth: 4,
	      strokeAlpha: .5,
	      id: 'foobar'
	    }, {
	      coordinates: [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
	      type: 'polygon',
	      fillAlpha: 1,
	      strokeColor: '#ffffff',
	      fillColor: '#0000ff',
	      id: 'zap'
	    }]
	  };
  }

  onRegionDidChange = (location) => {
    this.setState({ currentZoom: location.zoomLevel });
    console.log('onRegionDidChange', location);
  };
  onRegionWillChange = (location) => {
    console.log('onRegionWillChange', location);
  };
  onUpdateUserLocation = (location) => {
    console.log('onUpdateUserLocation', location);
  };
  onOpenAnnotation = (annotation) => {
    console.log('onOpenAnnotation', annotation);
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
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      console.log('offline pack progress', progress);
    });
    this._offlineMaxTilesSubscription = Mapbox.addOfflineMaxAllowedTilesListener(tiles => {
      console.log('offline max allowed tiles', tiles);
    });
    this._offlineErrorSubscription = Mapbox.addOfflineErrorListener(error => {
      console.log('offline error', error);
    });
  }

  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
    this._offlineMaxTilesSubscription.remove();
    this._offlineErrorSubscription.remove();
  }

  addNewMarkers = () => {
    // Treat annotations as immutable and create a new one instead of using .push()
    this.setState({
      annotations: [ ...this.state.annotations, {
        coordinates: [40.73312,-73.989],
        type: 'point',
        title: 'This is a new marker',
        id: 'foo'
      }, {
        'coordinates': [[40.749857912194386, -73.96820068359375], [40.741924698522055,-73.9735221862793], [40.735681504432264,-73.97523880004883], [40.7315190495212,-73.97438049316406], [40.729177554196376,-73.97180557250975], [40.72345355209305,-73.97438049316406], [40.719290332250544,-73.97455215454102], [40.71369559554873,-73.97729873657227], [40.71200407096382,-73.97850036621094], [40.71031250340588,-73.98691177368163], [40.71031250340588,-73.99154663085938]],
        'type': 'polygon',
        'fillAlpha': 1,
        'fillColor': '#ff0000',
        'strokeAlpha': 1,
        'id': 'new-black-polygon'
      }]
    });
  };

  updateMarker2 = () => {
    // Treat annotations as immutable and use .map() instead of changing the array
    this.setState({
      annotations: this.state.annotations.map(annotation => {
        if (annotation.id !== 'marker2') { return annotation; }
        return {
          coordinates: [40.714541341726175,-74.00579452514648],
          'type': 'point',
          title: 'New Title!',
          subtitle: 'New Subtitle',
          annotationImage: {
            source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
            height: 25,
            width: 25
          },
          id: 'marker2'
        };
      })
    });
  };

  removeMarker2 = () => {
    this.setState({
      annotations: this.state.annotations.filter(a => a.id !== 'marker2')
    });
  };

  render() {
    StatusBar.setHidden(false);
    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          styleURL={Mapbox.mapStyles.dark}
          userTrackingMode={this.state.userTrackingMode}
          annotations={this.state.annotations}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          onTap={this.onTap}
        />
      <ScrollView style={styles.scrollView}>
        {this._renderButtons()}
      </ScrollView>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View>
        <Text onPress={() => this._map && this._map.setDirection(0)}>
          Set direction to 0
        </Text>
        <Text onPress={() => this._map && this._map.setZoomLevel(6)}>
          Zoom out to zoom level 6
        </Text>
        <Text onPress={() => this._map && this._map.setCenterCoordinate(48.8589, 2.3447)}>
          Go to Paris at current zoom level {parseInt(this.state.currentZoom)}
        </Text>
        <Text onPress={() => this._map && this._map.setCenterCoordinateZoomLevel(35.68829, 139.77492, 14)}>
          Go to Tokyo at fixed zoom level 14
        </Text>
        <Text onPress={() => this._map && this._map.easeTo({ pitch: 30 })}>
          Set pitch to 30 degrees
        </Text>
        <Text onPress={this.addNewMarkers}>
          Add new marker
        </Text>
        <Text onPress={this.updateMarker2}>
          Update marker2
        </Text>
        <Text onPress={() => this._map && this._map.selectAnnotation('marker1')}>
          Open marker1 popup
        </Text>
        <Text onPress={() => this._map && this._map.deselectAnnotation()}>
          Deselect annotation
        </Text>
        <Text onPress={this.removeMarker2}>
          Remove marker2 annotation
        </Text>
        <Text onPress={() => this.setState({ annotations: [] })}>
          Remove all annotations
        </Text>
        <Text onPress={() => this._map && this._map.setVisibleCoordinateBounds(40.712, -74.227, 40.774, -74.125, 100, 0, 0, 0)}>
          Set visible bounds to 40.7, -74.2, 40.7, -74.1
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
        <Text onPress={() => {
            Mapbox.addOfflinePack({
              name: 'test',
              type: 'bbox',
              bounds: [0, 0, 0, 0],
              minZoomLevel: 0,
              maxZoomLevel: 0,
              metadata: { anyValue: 'you wish' },
              styleURL: Mapbox.mapStyles.dark
            }).then(() => {
              console.log('Offline pack added');
            }).catch(err => {
              console.log(err);
            });
        }}>
          Create offline pack
        </Text>
        <Text onPress={() => {
            Mapbox.getOfflinePacks()
              .then(packs => {
                console.log(packs);
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Get offline packs
        </Text>
        <Text onPress={() => {
            Mapbox.removeOfflinePack('test')
              .then(info => {
                if (info.deleted) {
                  console.log('Deleted', info.deleted);
                } else {
                  console.log('No packs to delete');
                }
              })
              .catch(err => {
                console.log(err);
              });
        }}>
          Remove pack with name 'test'
        </Text>
        <Text>User tracking mode is {this.state.userTrackingMode}</Text>
      </View>
    );
  }
}
*/