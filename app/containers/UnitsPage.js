import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

import MenuButton from '../components/MenuButton';
import SelectRow from '../components/SelectRow';

class UnitsPage extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	  }
  }
	
	render() {
		return (
			<View style={S.container}>
				<View style={S.menuBar}>
					<Text style={S.menuText}>Units</Text>
	        <MenuButton
	          text="Back"
	          icon="back"
	          position={{top:25,left:0}}
	          onPress={() => this.props.onPushRoute(1)}
	        />
	        <MenuButton
	          text="Close"
	          icon="close"
	          position={{top:25,right:10}}
	          onPress={() => this.props.onPushRoute(0)}
	        />
		    </View>
		    <View style={S.innerContainer}>
		    	
				</View>
			</View>
		)
	}
}


function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(UnitsPage)