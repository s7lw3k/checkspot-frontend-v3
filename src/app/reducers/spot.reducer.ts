import { Action } from '@ngrx/store';
import { Spot } from '../models/spot.model';

export const ADD_SPOT = 'ADD_SPOT';

export function addSpotReducer(state: Spot[] = [], action: Action) {
	switch (action.type) {
		case ADD_SPOT:
			return [...state, action.payload];
		default:
			return state;
	}
}
