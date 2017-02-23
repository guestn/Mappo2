import {
	StyleSheet
} from 'react-native';

const S = StyleSheet.create({
  container: {
	  position:'relative',
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:20,
    paddingTop: 100
  },
  abs: {
	  position:'absolute'
  },
  
// MENU //

  menuButton: {
	  position:'absolute',
	  padding:10, 
	  backgroundColor: 'rgba(255,255,255,0.2)',
  },
	menuIcon : {
		width: 48,
		height: 48
	},

// HOMEPAGE //

	homeContainer: {
	  position:'relative',
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:0,
    //paddingTop: 100
  },
  
  recorderContainer: {
	  top: 20,
	  left: 100,
	  padding: 20,
	  borderWidth: 3,
	  borderColor: '#fff',
	  backgroundColor: 'transparent',
  },
  recordButton: {
	  borderWidth:1,
	  borderColor: 'green',
	  padding: 10,
  },
  
  homepageTest: {
	  top: 150,
	  left: 5,
	  backgroundColor: 'rgba(255,255,255,0.2)',
  },
  
	whiteText: {
		color: '#fff',
	},
	bigText: {
		fontSize: 30,
		alignSelf: 'flex-end'
	},
  altitude: {
	  bottom: 10,
	  left: 10,
	  width: 120,
	  borderWidth: 3,
	  borderColor: '#fff',
	  backgroundColor: 'transparent',
	  paddingLeft: 5,
	  paddingRight: 5,
  },
  heading: {
	  bottom: 10,
	  right: 10,
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
	  flex: 0.8,
	  borderColor: 'red',
	  borderWidth: 1
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
  test: {
	  position:'absolute',
	  bottom: 5,
	  right: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  }
});

module.exports = S;
