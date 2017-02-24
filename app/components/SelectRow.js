import React, { Component } from 'react';
import {
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import S from '../styles/Styles';

export default class SelectRow extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	  }
  }
	
	render() {
		return (
			<TouchableOpacity style={S.settingsRow} onPress={() => this.props.nav(3)}>
				<Text style={[S.whiteText, S.text20]}>{this.props.text}</Text>
			</TouchableOpacity>
		)
	}
}