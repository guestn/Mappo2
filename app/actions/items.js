import * as types from './types';
//import Api from '../lib/api';
import database from '../database';


export function fetchItemsFromArchive(searchStr) {
	return (dispatch, getState) => { //give access to entire state;
		return database.ref('Archive')
		.once('value', snap => {
      const items = snap.val();
      console.log(items	)
      //dispatch(getInviteFulfilledAction(invite))
			dispatch(setSearchedItems({items:items}))
		}).catch((err) => {
			console.log(err);
		})
	}
}

export function setSearchedItems({items}) {
	console.log('items', items)
	return {
		type: types.SET_SEARCHED_ITEMS,
		items: items
	}
}

export function addItemToArchive(item) {
/*
	return (dispatch, getState) => { //give access to entire state;
		return database.ref('archive')
		.once('value', snap => {
      const items = snap.val();
      console.log(items.archive	)
      //dispatch(getInviteFulfilledAction(invite))
			dispatch(setSearchedItems({items:items}))
		}).catch((err) => {
			console.log(err);
		})
	}
*/
	console.log(item)
	
	return (dispatch) => { 
		let id = new Date().getTime();//Math.random().toString(36).substring(7)

		database.ref('Archive').child(id).set(
			{'id': id,
			'points': item}
		).then(() => {
			console.log('SAVED TO ARCHIVE');
			dispatch(setSearchedItems({item}))
		})
	}
	
}
// Current Tracklog

export function getCurrentTracklog() {
	return (dispatch, getState) => {
		
	}
	
/* FOR ONLINE:
	return (dispatch, getState) => { //give access to entire state;
		return database.ref('currentTrack')
		.once('value', snap => {
      const items = snap.val();
      console.log('currentTrack',items)
      //dispatch(getInviteFulfilledAction(invite))
			dispatch(setCurrentTracklog({items}))
		}).catch((err) => {
			console.log(err);
		})
	}
*/
}

export function setCurrentTracklog({items}) {
	//console.log('items', items)
	return {
		type: types.SET_CURRENT_TRACKLOG,
		items
	}
}

// Saving tracks

//const itemsRef = firebaseApp.database().ref('items')

export function recordTracklogPoint(point) {
	console.log('point',point);
	
/*
	AsyncStorage.setItem('currentTracklog', JSON.stringify(value));
	AsyncStorage.getItem('currentTracklog').then((value) => {
			if (value != null) {
				var val = (value === "true");
				this.setState({settings: val});
			}
    }).done();
    console.log('storageGot')
*/

//for online storage:
	return (dispatch) => { 
		let id = new Date().getTime();//Math.random().toString(36).substring(7)

		database.ref('currentTrack').child(id).set({
			time: id,
			point: point,
		}).then(() => {
			console.log('SAVED POINT');
			return point;
			//dispatch(newTracklogPoint({point:point}))
		})
	}

}


export function newTracklogPoint({point}) {
	return {
		type: types.SET_NEW_TRACKLOG_POINT,
		point: point
	}
}

export function  clearCurrentTracklog() {
	
	return (dispatch) => { 

		database.ref('currentTrack').remove()
		.then(() => {
			console.log('CLEARED');
			return {
				type: types.CLEAR_CURRENT_TRACKLOG,
				null
			}
			
			//dispatch(newTracklogPoint({point:point}))
		})
	}
}
/*
export function addRecipe() {
	return {
		type: types.ADD_ITEMS,
	}
}
*/
