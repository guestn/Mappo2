import * as types from './types';
//import Api from '../lib/api';
import database from '../database';


export function fetchItems(searchStr) {
	return (dispatch, getState) => { //give access to entire state;

		return database.ref('/')
		.once('value', snap => {
      const items = snap.val();
      console.log(items.archive	)
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
		items: items.archive
	}
}

export function addRecipe() {
	return {
		type: types.ADD_ITEMS,
	}
}
