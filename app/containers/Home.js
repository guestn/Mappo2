import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

import MenuButton from '../components/MenuButton';

import * as timeFunctions from '../lib/timeFunctions'

class Home extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	    searching: false, 
	    textInput: '' 
	  }
  }
  
	render() {
		return (
			<View style={S.container}>
				<Text>Homepage</Text>
				<Text style={S.row}>
          Route: {this.props.route.key}
        </Text>
        <MenuButton
          text="Settings"
          position={{top:20,right:0}}
          onPress={() => this.props.onPushRoute(1)}
        />
        <MenuButton
          text="Archive"
          position={{top:20,left:0}}
          onPress={() => this.props.onPushRoute(2)}
        />
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
		searchedItems: state.searchedItems
	}
}

export default connect(mapStateToProps)(Home)