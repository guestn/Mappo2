import React, { Component } from 'react';
import {
	Text,
	Image,
	TouchableHighlight
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

class MenuButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[S.menuButton, this.props.position] }
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}


function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(MenuButton)