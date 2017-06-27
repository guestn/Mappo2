import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/items';

import Navigation from './Navigation';


class AppContainer extends Component {
	
	constructor(props, context) {
    super(props, context);

  }
	
	render() {
		return (
			<Navigation {...this.props}/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
	return {
		itemsCount: state.itemsCount
	} 
}, mapDispatchToProps)(AppContainer);