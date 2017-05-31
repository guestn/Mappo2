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

import BackgroundGeolocation from "react-native-background-geolocation";


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
    	initialPosition: null,
     	recording: false,
    	recordInterval: 4,
    	recordDuration: 0,
    	intervalId: null,
    	currentTracklog: initialTracklog,
    	distanceFromHome: 0
 	  }
  }
  componentWillMount() {
	  this.setState({
		  initialPosition: null,
     	recording: false,
    	recordInterval: 4,
    	recordDuration: 0,
    	intervalId: null,
    	currentTracklog: initialTracklog,
    	distanceFromHome: 0
	  })

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);
    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);
    
    //BackgroundGeolocation.watchPosition(this.onLocation);	  //create stream of datapoints
    
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 0,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      activityRecognitionInterval: 0,
      // Application config
      debug: false, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
     
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }
  
  componentDidMount() {
	  BackgroundGeolocation.getCurrentPosition((position) => {
		  console.log('initial',position)
		  this.setState({initialPosition: position});
	  })
	  this.getCurrentTracklog();
	  this.getDistanceFromHome();
	  
	  // timer to collect position must be bound to component
	  var count = 0;
		  this.timer = setInterval(() => {
			// if recording is enabled, record every recordInterval seconds
		  if (count >= this.state.recordInterval) {
			  count = 0;
    	}
    	count ++;
    	
    	// get the duration of the current duration
    	if (this.state.recording) {
	    	this.setState({recordDuration: this.state.recordDuration + 1 })
    	}
  	}, 1000);
  	this.timer;
  }
  
  componentWillUnmount() {
		clearInterval(this.timer);
		 // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }
  
  onLocation = (position) => {
    console.log('- [js]location: ', JSON.stringify(position));
    console.log('heading',position.coords['heading'])

    this.setState({initialPosition: position});
    console.log('posn',this.state.initialPosition)
    
    if (this.state.recording) this.recordTracklogPoint()
    
    this.getCurrentTracklog();
    this.getDistanceFromHome();

  }
  
  onMotionChange = (position) => {
    console.log('- [js]motionchanged: ', JSON.stringify(position));
    this.setState({initialPosition: position});
    if (this.state.recording) this.recordTracklogPoint()

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
		 
	}

  clearCurrentTracklog = (archiveIsTrue) => {
		
	  this.getCurrentTracklog();
	  
	  if (archiveIsTrue) this.props.addItemToArchive(this.state.currentTracklog);

	  // clear async storage;
	  AsyncStorage.setItem('currentTracklog', JSON.stringify({}));

	  this.setState({
		  currentTracklog: initialTracklog,
		  recordDuration:  0,
		  distanceFromHome: 0
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
		const altitude = (this.state.initialPosition != null && this.state.initialPosition.coords != undefined) ? this.state.initialPosition.coords.altitude.toFixed(0) : '...'
		const heading = ((this.state.initialPosition != null && this.state.initialPosition.coords != undefined) && (this.state.initialPosition.coords.heading =! -1)) ? this.state.initialPosition.coords.heading : 0;
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
					{ (this.state.initialPosition != null && this.state.initialPosition.coords != undefined) ?
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
						<Text style={[S.abs, S.orangeText, S.text20, S.alignRight]}>{heading}</Text>
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