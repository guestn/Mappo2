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
		this.props.fetchItemsFromArchive(this.state.textInput).then((res) => {
			
      this.setState({searching: false })
    });
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
						<TextInput 
							style={S.textInput} 
							value={this.state.textInput} 
							placeholder="Enter something"
							onChangeText={(textInput) => this.setState({textInput})} 
						/>
						<TouchableOpacity style={S.button} onPress={() => this.onSearchPressed()}>
							<Text>Search</Text>
						</TouchableOpacity>
					</View>
	
					<ScrollView style={[S.scrollView, {borderColor: 'red', borderWidth:2}]}>
						{!this.state.searching && this.getArrayFromObject().map((item) => {
							console.log(item)
	            return <TouchableOpacity key={item.id}  style={S.settingsRow} onPress={ () => this.props.navigate({ key: 'Detail', id: item.id}) }>
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