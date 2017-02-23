import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedItems = createReducer({}, {
	[types.SET_SEARCHED_ITEMS](state, action) {
		let newState = {};
		console.log('ACTION',action.items)
		//action.items.forEach((item) => {
		//})
		return action.items;
	}
})

export const itemCount = createReducer(0,{
	[types.ADD_ITEM](state, action)  {
		return state + 1;
	},
/*
	[types.SET_SEARCHED_ITEMS](state, action) {
		return action.items.length;
	}
*/
})



export const tracklogPoint = createReducer({}, {
	[types.RECORD_TRACKLOG_POINT](state, action) {
		let newState = {};
		console.log('ACTION',action.items)

		return action.items;
	}
})


export const currentTracklog = createReducer({}, {
	[types.SET_CURRENT_TRACKLOG](state, action) {
		console.log('state', state)
		return Object.assign({}, state,
			action.items
		)
	},
	[types.CLEAR_CURRENT_TRACKLOG](state, action) {
		console.log('clear', state)
		return Object.assign({}, state,
			null
		)
	}
})