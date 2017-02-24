import React, { Component } from 'react';
import {
	Text,
	Image,
	TouchableOpacity
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

class MenuButton extends Component {
  render() {
	  let icon = '';
	  
	  switch(this.props.icon) {
			case 'settings': icon = require('../assets/settings-icon.png');
				break;

			case 'close': icon = require('../assets/close-icon.png');
				break;

			case 'back': icon = require('../assets/back-icon.png');
				break;
			
			case 'archive': icon = require('../assets/archive-icon.png');


	  }

    return (
      <TouchableOpacity
        style={[S.menuButton, S.smallMenuButton, this.props.position] }
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        { this.props.icon ? 
	        <Image style={S.menuIcon} source={icon}/> :
					<Text>{this.props.text}</Text>
			}
      </TouchableOpacity>
    );
  }
}


function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(MenuButton)