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

class SettingsPage extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	  }
  }
	
	render() {
		return (
			<View style={S.container}>
				<Text>SettingsPage</Text>
				<Text style={S.row}>
          Route: {this.props.route.key}
        </Text>
        <MenuButton
          text="Back"
          position={{top:20,left:0}}
          onPress={this.props.onPopRoute}
        />
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(SettingsPage)