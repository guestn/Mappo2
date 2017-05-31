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
		this.props.fetchItemsFromArchive().then((res) => {
			
      this.setState({searching: false })
    });
	}
	
	expand = (id) => {
		console.log(id)
	}
	
	getArrayFromObject = () => {
		//magic ES6 to get array from obj.
		let obj = Object.keys(this.props.searchedItems).map( key => this.props.searchedItems[key]);
		console.log(obj)
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
	
					<View style={S.searchContainer}>
						<TouchableOpacity style={S.searchButton} onPress={() => this.onSearchPressed()}>
							<Text style={[S.whiteText, S.text20]}>Get Archive</Text>
						</TouchableOpacity>
					</View>
	
					<ScrollView style={[S.scrollView]}>
						{!this.state.searching && this.getArrayFromObject().map((item) => {
							console.log(item)
	            return <TouchableOpacity key={item.id}  style={S.settingsRow} onPress={ () => this.expand(item.id) }>
	            <View>
	              <Text style={{}} >{utilFunctions.unixTimeToString(item.id)}</Text>
	            </View>
	          </TouchableOpacity>
	          })}
	          {this.state.searching ? <Text style={[S.whiteText, S.text30]}>Searching...</Text> : null }
	
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