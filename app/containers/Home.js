import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	AlertIOS,
	AsyncStorage
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl';

import S from '../styles/Styles';

import { connect } from 'react-redux';

import Map from '../components/Map';
import MenuButton from '../components/MenuButton';


import * as timeFunctions from '../lib/timeFunctions'

const initialTracklog = { 
	1487791194116: {
	  	point: {
	    	coords: {
	    		latitude: 0,
					longitude: 0
	  		}
	  	}
	  }
	}


class Home extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
    	initialPosition: {
	    	coords: {
	    		latitude: 0,
					longitude: 0,
					altitude: 0,
					heading: 0
    		},
    	},
    	recording: false,
    	recordInterval: 4,
    	intervalId: null,
    	currentTracklog: initialTracklog
 	  }
  }
  
  componentDidMount() {
	  this.getCurrentPosition();
	  this.getCurrentTracklog();
	  // timer to collect position must be bound to component
	  var count = 0;
		  this.timer = setInterval(() => {
				  // if recording is enabled, record every recordInterval seconds
		  if (count >= this.state.recordInterval) {
			  count = 0;
				if (this.state.recording) { this.recordTracklogPoint() }
				this.getCurrentPosition();

    	}
    	count ++;

  	}, 1000);
  	this.timer;
  }
  
  componentDidUnMount() {
		clearInterval(this.timer);
  }
  
  getCurrentPosition = () => {
	  navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: position});
        console.log('updating real position')
        this.getCurrentTracklog();
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  
  getCurrentTracklog = async () => {
	  try {
      var value = await AsyncStorage.getItem('currentTracklog');
      if (value !== null){
        this.setState({currentTracklog: JSON.parse(value)});
        //console.log('Recovered selection from disk');
      } else {
        console.log('Initialized: Empty.');
        this.setState({currentTracklog: {}})
      }
    } catch (err) {
      console.log('AsyncStorage Error: ' + err.message);
    }
 	}
	
	recordTracklogPoint = () => {
		this.getCurrentTracklog();		
		console.log('yeah recording');
			
		let id = new Date().getTime();
	  let newPoint = {
			time: id,
			point: this.state.initialPosition
		}
		
		let newTracklog = this.state.currentTracklog;
		newTracklog[id] = newPoint;

		this.setState({
			currentTracklog: newTracklog
		})

		AsyncStorage.setItem('currentTracklog', JSON.stringify(this.state.currentTracklog));
		 
	  //this.props.recordTracklogPoint(this.state.initialPosition)
	}

  clearCurrentTracklog = (archiveIsTrue) => {
		
	  this.getCurrentTracklog();
	  
	  if (archiveIsTrue) this.props.addItemToArchive(this.state.currentTracklog);

	  	  // clear async storage;
	  AsyncStorage.setItem('currentTracklog', JSON.stringify({}));

	  this.setState({
		  currentTracklog: initialTracklog
    });
  }

  handleRecorderClick = () => {
	  console.log('RECORDING')
	  this.setState({
		  recording: !this.state.recording
	  })
  }
    
  handleClearClick = () => {
	  AlertIOS.alert(
		 'Clear',
		 'Clear Current Tracklog?',
		 [
		   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		   {text: 'Clear', onPress: () => this.clearCurrentTracklog(false)},
			 {text: 'Clear & Archive', onPress: () => this.clearCurrentTracklog(true)},
	   
		 ],
		);
  }
  
 	
	getArrayFromObjectAndConvert = (obj) => {
		//Convert the position array into [[lat,lon],[lat,lon]...] for mapbox plotting
		//magic ES6 to get array from obj.
		let arr = Object.keys(obj).map( key => obj[key]);
		
		let coordArray = arr.map(function(x) {
		  return [x.point.coords.latitude,x.point.coords.longitude]
		})
		
		return coordArray;
		
	}
  
	render() {
		const altitude = this.state.initialPosition.coords ? this.state.initialPosition.coords.altitude.toFixed(2) : '...'
		const heading = this.state.initialPosition.coords && (this.state.initialPosition.coords.heading =! -1) ? this.state.initialPosition.coords.heading : 0;
		
				
		return (
			<View style={S.homeContainer}>

				<Map currentTracklog={this.getArrayFromObjectAndConvert(this.state.currentTracklog)}/>
				


				
				<View style={[S.abs, S.recorderContainer]}>
					<TouchableOpacity style={S.recordButton} onPress={this.handleRecorderClick}>
							{ this.state.recording ? 
								<Image style={{width:80, height:40}} source={require('../assets/recordstop-icon.png')}/> : 
								<Image style={{width:80, height:40}} source={require('../assets/record-icon.png')}/>}
 					</TouchableOpacity>
				</View>
				
				<View style={[S.abs, S.homepageTest]}>
					<TouchableOpacity style={S.recordButton} onPress={this.handleClearClick}>
						<Text style={S.whiteText}>
							CLEAR
						</Text>
					</TouchableOpacity>
					{ (this.state.initialPosition != null) ?
						<View>
							<Text style={S.whiteText}>{this.state.initialPosition.coords.latitude}</Text>
							<Text style={S.whiteText}>{this.state.initialPosition.coords.longitude}</Text>
							<Text style={S.whiteText}>{this.state.initialPosition.coords.heading}</Text>
						</View> :
						null
					}
				</View>
				
	      <MenuButton
          text="Settings"
          position={{top:20,right:10}}
          icon="settings"
          onPress={() => this.props.onPushRoute(1)}
	      />

	        
	      <View style={[S.abs, S.homepageBottomDisplay]}>
	        <View style={[S.altitude]}>
	        	<Text style={[S.whiteText, S.text16]}>ALT.</Text>
						<Text style={[S.whiteText, S.text40, S.alignRight]}>{altitude}</Text>
					</View>
	        <View style={[S.altitude]}>
	        	<Text style={[S.whiteText, S.text16]}>HOME</Text>
						<Text style={[S.whiteText, S.text40, S.alignRight]}>46.5</Text>
					</View>
					<View style={[S.heading]}>
						<Image style={[S.headingIcon, {transform: [{ rotate: heading + 'deg'}]}]} source={require('../assets/heading-icon.png')}/>
					</View>
	      </View>
			
				
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
		currentTracklog: state.currentTracklog
	}
}

export default connect(mapStateToProps)(Home)