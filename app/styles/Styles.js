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
  button: {
	  padding: 10,
	  backgroundColor: 'coral'
  },
  menuButton: {
	  position:'absolute',
	  padding:20, 
	  backgroundColor: 'purple',
	  width: 120
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
  }
});

module.exports = S;
