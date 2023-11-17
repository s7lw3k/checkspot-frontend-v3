import { User } from './user';
import { Address } from './address';
import { Opinion } from './opinion';
import { LatLng } from 'leaflet';

export interface Spot {
	id?: number;
	name?: string;
	des?: string;
	address?: Address;
	issuedBy?: User;
	opinions?: Opinion[];
	coordinates: LatLng;
}
