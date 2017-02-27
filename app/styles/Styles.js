import {
	StyleSheet
} from 'react-native';

const darkGrey = '#4D4D4D'
const midGrey = '#666'
const orange = '#FF4625';
const homeInfoBg = '#000';
const SHDW_DIMS  = {
		   height: 1,
		   width: 0
    }

const S = StyleSheet.create({
  container: {
	  position:'relative',
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: midGrey,
    padding:0,
  },
  innerContainer: {
	  padding: 20
  },
  abs: {
	  position:'absolute'
  },

  
// TEXT //
	whiteText: {
		color: '#fff',
		fontFamily: 'Orkney-Regular',
	},
	orangeText: {
		color: orange,
		fontFamily: 'Orkney-Regular',
	},
	bigText: {
		fontSize: 30,
		alignSelf: 'flex-end'
	},
	text16: {
		fontSize: 16,
		fontFamily: 'Orkney-Regular',
		bottom: -8
	},
	text20: {
		fontSize: 20,
		fontFamily: 'Orkney-Regular',
		bottom: -8
	},
	text30: {
		fontSize: 30,
		fontFamily: 'Orkney-Regular',
		bottom: -6
	},
	text40: {
		fontSize: 40,
		fontFamily: 'Orkney-Regular',
		bottom: -8
	},
	alignRight: {
		textAlign: 'right'
	},
	
  
// MENU //

	menuBar: {
		backgroundColor: darkGrey,
		height: 80,
		paddingTop:20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	menuText: {
		color: 'white',
		fontSize: 24,
		fontFamily: 'Orkney-Regular',
	},
  largeMenuButton: {
	  position:'absolute',
	  padding:10, 
	  backgroundColor: 'rgba(255,255,255,0.2)',
  },
  smallMenuButton: {
	  position:'absolute',
	  padding:0,
	  backgroundColor: 'transparent',
  },
	menuIcon : {
		width: 48,
		height: 48
	},

// HOMEPAGE //

	homeContainer: {
	  position:'relative',
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding:0,
  },
  
  timeContainer: {
	  backgroundColor: 'transparent',
	  top: 20,
	  left: 5
  },
  
  recorderContainer: {
	  flexDirection:'row',
	  alignItems: 'center',
	  justifyContent: 'center',
	  top: 10,
	  left: 120,
	  right:120,
	  padding: 10,
	  borderWidth: 0,
	  borderColor: '#fff',
	  backgroundColor: 'transparent',
  },
  recordButton: {
	  borderWidth:0,
	  borderColor: 'green',
	  padding: 0,
  },
 
  homepageTest: {
	  top: 150,
	  left: 5,
	  backgroundColor: 'rgba(255,155,255,0.2)',
  },
  
  homepageBottomDisplay: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  backgroundColor: homeInfoBg,
	  bottom: 10,
	  left:10,
	  right: 10
  },
 
  altitude: {
	  width: 120,
	  borderWidth: 3,
	  borderColor: '#fff',
	  backgroundColor: 'transparent',
	  paddingLeft: 5,
	  paddingRight: 5,
	  //flexDirection: 'row',
	  flexWrap: 'wrap'
  },
  altitudeLegend: {
	  flexDirection:'row',
	  flex:1, 
	  justifyContent:'space-between'
  },
  heading: {
	  width: 72,
	  backgroundColor: 'transparent',
  },
  headingIcon: {
	  width: 72, 
	  height: 72,
  },
  
  button: {
	  padding: 10,
	  backgroundColor: 'coral'
  },
  scrollView: {
	  //flex: 1,
	  borderColor: 'red',
	  borderWidth: 1,
	  height: 200
  },
  listItem: {
	  borderBottomColor: 'red',
	  borderWidth: 1,
	  marginBottom: 5,
	  height: 50
  },
  searchContainer: {
	  flexDirection: 'column',
	  backgroundColor: '#ddd'
  },
  textInput: {
		height: 40,	  
	  backgroundColor: '#eee',
  },
  
// MAPBOX //
  
  mapContainer: {
    flex: 1.1,
    alignItems: 'stretch'
  },
  map: {
    flex: 1
  },

// SETTINGS PAGE //
  settingsRow: {
	  backgroundColor: orange,
	  padding: 20,
	  marginBottom: 20,
		shadowColor: "#000000",
		shadowOpacity: 0.4,
		shadowRadius: 5,
		shadowOffset: SHDW_DIMS
  },
  
  test: {
	  position:'absolute',
	  bottom: 5,
	  right: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  }
  

});

module.exports = S;
