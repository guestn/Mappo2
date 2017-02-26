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

import * as utilFunctions from '../lib/utilFunctions';

class ArchivePage extends Component {
	 constructor(props) {
    super(props)
    this.state = { 
	    searching: false, 
	    textInput: '' 
	  }
  }
	
	onSearchPressed = () => {
		this.setState({
			searching: true
		})
		this.props.fetchItemsFromArchive(this.state.textInput).then((res) => {
      this.setState({searching: false })
    });
	}
	
	getArrayFromObject = () => {
		//magic ES6 to get array from obj.
		let obj = Object.keys(this.props.searchedItems).map( key => this.props.searchedItems[key]);
		return obj	
	}

	render() {
		return (
			<View style={S.container}>
	      <View style={S.menuBar}>
					<Text style={S.menuText}>Archive</Text>
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
					<Text>ArchivePage</Text>
					<Text style={S.row}>
	          Route: {this.props.route.key}
	        </Text>
	
					<View style={S.searchContainer}>
						<TextInput 
							style={S.textInput} 
							value={this.state.textInput} 
							placeholder="Enter a movie or TV programme"
							onChangeText={(textInput) => this.setState({textInput})} 
						/>
						<TouchableHighlight style={S.button} onPress={() => this.onSearchPressed()}>
							<Text>Search</Text>
						</TouchableHighlight>
					</View>
	
					<ScrollView style={S.scrollView}>
						{!this.state.searching && this.getArrayFromObject().map((item) => {
	            return <TouchableHighlight key={item.id}  style={S.listItem} onPress={ () => this.props.navigate({ key: 'Detail', id: item.id}) }>
	            <View>
	              <Text style={{}} >{timeFunctions.unixTimeToString(item.time)}</Text>
	            </View>
	          </TouchableHighlight>
	          })}
	          {this.state.searching ? <Text>Searching...</Text> : null }
	
					</ScrollView>
				</View>
			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		searchedItems: state.searchedItems
	}
}

export default connect(mapStateToProps)(ArchivePage)