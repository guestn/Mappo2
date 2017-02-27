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

//import Mapbox, { MapView } from 'react-native-mapbox-gl';


import S from '../styles/Styles';

import { connect } from 'react-redux';

import Map from '../components/Map';
import MenuButton from '../components/MenuButton';


import * as utilFunctions from '../lib/utilFunctions';




const initialTracklog = { 
	0: {
			time: 0,
	  	point: {
	    	coords: {
	    		latitude: 0,
					longitude: 0
	  		}
	  	}
	  }
	};


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
    	recordDuration: 0,
    	intervalId: null,
    	currentTracklog: initialTracklog,
    	distanceFromHome: 0
 	  }
  }
  
  
  componentDidMount() {
	  
	
	  this.setState({
		   currentTracklog: initialTracklog,
	  })
	  this.getCurrentPosition();
	  this.getCurrentTracklog();
	  this.getDistanceFromHome();
	  // timer to collect position must be bound to component
	  var count = 0;
		  this.timer = setInterval(() => {
			// if recording is enabled, record every recordInterval seconds
		  if (count >= this.state.recordInterval) {
			  count = 0;
				if (this.state.recording) this.recordTracklogPoint()
				this.getCurrentPosition();
    	}
    	count ++;
    	
    	// get the duration of the current duration
    	if (this.state.recording) {
/*
	    	const startPoint = this.getArrayFromObjectAndConvert(this.state.currentTracklog)[0];
	    	console.log('startTime',startPoint)
	    	const recordDurInSecs = ((new Date().getTime() - startPoint[2])/1000).toFixed(0);
*/
	    	this.setState({recordDuration: this.state.recordDuration + 1 })
    	}
  	}, 1000);
  	this.timer;
  }
  
  componentWillUnmount() {
		clearInterval(this.timer);
  }
  
  getCurrentPosition = () => {
	  navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: position});
        console.log('updating real position')
				console.log('this.state.currentTracklog',this.state.currentTracklog)

        this.getCurrentTracklog();
        this.getDistanceFromHome();
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
		  currentTracklog: initialTracklog,
		  recordDuration:  0
    });
    
    AlertIOS.alert(
	    'Current Tracklog Cleared',
	    '',
	    [
		   {text: 'Okay, I understand', onPress: () => console.log('OK Pressed')},
		 ],
		);
		
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
		   {text: 'Clear without Saving', onPress: () => this.clearCurrentTracklog(false), style: 'destructive'},
			 {text: 'Save & Clear', onPress: () => this.clearCurrentTracklog(true)},
	   
		 ],
		);
  }
 	
	getArrayFromObjectAndConvert = (obj) => {
		//Convert the position array into [[lat,lon],[lat,lon]...] for mapbox plotting
		//magic ES6 to get array from obj.
		let arr = Object.keys(obj).map( key => obj[key]);
		let coordArray = arr.map(function(x) {
		  return [x.point.coords.latitude, x.point.coords.longitude, x.time]
		})
		return coordArray;
	}
	
	getDistanceFromHome = () => {
		var currentTracklogArr = this.getArrayFromObjectAndConvert(this.state.currentTracklog)
		if (currentTracklogArr.length > 0) {
			var res = utilFunctions.distanceBetweenTwoPoints(currentTracklogArr[0],currentTracklogArr[currentTracklogArr.length-1])
			this.setState({distanceFromHome: res});
		}
	}
  
	render() {
		const altitude = this.state.initialPosition.coords ? this.state.initialPosition.coords.altitude.toFixed(0) : '...'
		const heading = this.state.initialPosition.coords && (this.state.initialPosition.coords.heading =! -1) ? this.state.initialPosition.coords.heading : 0;
		const distanceFromHome = this.state.distanceFromHome > 100 ? (this.state.distanceFromHome/1000).toFixed(1) : (this.state.distanceFromHome/1000).toFixed(2)
		
				
		return (
			<View style={S.homeContainer}>

				<Map currentTracklog={this.getArrayFromObjectAndConvert(this.state.currentTracklog)}/>
			<View style={[S.abs, S.timeContainer]}>
					<Text style={[S.whiteText, S.text30]}>{utilFunctions.secondsToString(this.state.recordDuration)}</Text>
				</View>
								
				<View style={[S.abs, S.recorderContainer]}>
					<TouchableOpacity style={S.recordButton} onPress={this.handleRecorderClick}>
							{ this.state.recording ? 
								<Image style={{width:80, height:40}} source={require('../assets/recordstop-icon.png')}/> : 
								<Image style={{width:80, height:40}} source={require('../assets/record-icon.png')}/>}
 					</TouchableOpacity>
				</View>
				
				<View style={[S.abs, S.homepageTest]}>
					<TouchableOpacity style={S.recordButton} onPress={this.handleClearClick}>
						<Text style={[S.whiteText, {padding:5}]}>CLEAR</Text>						
					</TouchableOpacity>
					{ (this.state.initialPosition != null) ?
						<View>
							<Text style={S.whiteText}>Lon: {this.state.initialPosition.coords.longitude}</Text>

							<Text style={S.whiteText}>Lat: {this.state.initialPosition.coords.latitude}</Text>
							<Text style={S.whiteText}>P: {this.getArrayFromObjectAndConvert(this.state.currentTracklog).length}</Text>
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
	        	<View style={S.altitudeLegend}>
	        		<Text style={[S.whiteText, S.text16]}>ALT.</Text><Text style={[S.orangeText, S.text16]}>M</Text>
	        	</View>
						<Text style={[S.whiteText, S.text40, S.alignRight]}>{altitude}</Text>
					</View>
	        <View style={[S.altitude]}>
	        	<View style={S.altitudeLegend}>
	        		<Text style={[S.whiteText, S.text16]}>HOME&#8594;</Text><Text style={[S.orangeText, S.text16]}>KM</Text>
	        	</View>
						<Text style={[S.whiteText, S.text40, S.alignRight]}>{distanceFromHome}</Text>
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