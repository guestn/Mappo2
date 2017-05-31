import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

import MenuButton from '../components/MenuButton';
import SelectRow from '../components/SelectRow';


import * as utilFunctions from '../lib/utilFunctions';


class SettingsPage extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	  }
  }
	
	render() {
		return (
			<View style={S.container}>
				<View style={S.menuBar}>
					<Text style={S.menuText}>Settings</Text>
	        <MenuButton
	          text="Back"
	          icon="back"
	          position={{top:25,left:0}}
	          onPress={this.props.onPopRoute}
	        />
	        <MenuButton
	          text="Archive"
	          icon="archive"
	          position={{top:25,right:10}}
	          onPress={() => this.props.onPushRoute(2)}
	        />

		    </View>
		    <View style={S.innerContainer}>

	        <SelectRow 
	        	text="units"
	        	nav={(val) => this.props.onPushRoute(val)}
	        />
	        <SelectRow 
	        	text="auto start/stop"
	        />
				</View>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(SettingsPage)