import React, { Component } from 'react';
import {
	Navigator,
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	NavigationExperimental
	
} from 'react-native';
import S from '../styles/Styles';

import { connect } from 'react-redux';

import Home from './Home';
import SettingsPage from './SettingsPage';
import ArchivePage from './ArchivePage';
import UnitsPage from './UnitsPage';


const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import * as utilFunctions from '../lib/utilFunctions';

import IdleTimerManager from 'react-native-idle-timer';


class Navigation extends Component {
	 constructor(props, context) {
    super(props, context)
    this.state = { 
	    navigationState: {
        index: 0, // Starts with first route focused.
        routes: [
        	{key: 'HomePage'}, 
        	{key: 'SettingsPage'},
        	{key: 'ArchivePage'},
        	{key: 'UnitsPage'}
        ], 
      },
	  }
		this._onNavigationChange = this._onNavigationChange.bind(this);
  }
  
  componentWillMount() {
  	IdleTimerManager.setIdleTimerDisabled(true);
	}

	componentWillUnmount() {
 	 IdleTimerManager.setIdleTimerDisabled(false);
	}

	_onNavigationChange(type) {
  // Extract the navigationState from the current state:
  let {navigationState} = this.state;
  
  navigationState = NavigationStateUtils.jumpToIndex(navigationState, type);

  // NavigationStateUtils gives you back the same `navigationState` if nothing
  // has changed. We will only update state if it has changed.
  if (this.state.navigationState !== navigationState) {
    // Always use setState() when setting a new state!
    this.setState({navigationState});
    // If you are new to ES6, the above is equivalent to:
    // this.setState({navigationState: navigationState});
  }
}

	render() {
		return (
			<MyVerySimpleNavigator
        navigationState={this.state.navigationState}
        onNavigationChange={this._onNavigationChange}
        onExit={this._exit}
        {...this.props}
      />
	  )

	}
}

class MyVerySimpleNavigator extends Component {

  // This sets up the methods (e.g. Pop, Push) for navigation.
  constructor(props, context) {
    super(props, context);

    //this._onPushRoute = this.props.onNavigationChange(val);
    this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop');
    this._renderScene = this._renderScene.bind(this);
  }

	_onPushRoute(val) {
		this.props.onNavigationChange(val)
	}
  // Now we finally get to use the `NavigationCardStack` to render the scenes.
  render() {
    return (
      <NavigationCardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        style={S.navigator}
      />
    );
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  // Here you could choose to render a different component for each route, but
  // we'll keep it simple.
  _renderScene(sceneProps) {
	  if (sceneProps.scene.index === 0) {

		  return (
		    <Home
		      route={sceneProps.scene.route}
		      onPushRoute={(val) => this._onPushRoute(val)}
		      onPopRoute={() => this._onPushRoute(0)}
		      onExit={this.props.onExit}
		      {...this.props}
		    />
			);
		}
		if (sceneProps.scene.index === 1) {
			return (
		    <SettingsPage
		    	route={sceneProps.scene.route}
		      onPushRoute={(val) => this._onPushRoute(val)}
		      onPopRoute={() => this._onPushRoute(0)}
		      onExit={this.props.onExit}
		      {...this.props}
				/>
			);	
		}
		if (sceneProps.scene.index === 2) {
			return (
		    <ArchivePage
		    	route={sceneProps.scene.route}
		      onPushRoute={(val) => this._onPushRoute(val)}
		      onPopRoute={() => this._onPushRoute(0)}
		      onExit={this.props.onExit}
		      {...this.props}
		    />
			);	
		}
		if (sceneProps.scene.index === 3) {
			return (
		    <UnitsPage
		    	route={sceneProps.scene.route}
		      onPushRoute={(val) => this._onPushRoute(val)}
		      onPopRoute={() => this._onPushRoute(0)}
		      onExit={this.props.onExit}
		      {...this.props}
		    />
			);	
		}					
  }
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(Navigation)