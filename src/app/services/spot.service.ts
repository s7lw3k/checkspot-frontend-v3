import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spot } from '../object/spot';
import { LatLng, Marker, Map as lMap, MarkerClusterGroup } from 'leaflet';
import { environment } from '../consts';

@Injectable({ providedIn: 'root' })
export class SpotService {
	newCords: LatLng;
	private map: lMap;
	private _clusterGroup: MarkerClusterGroup;
	constructor(private http: HttpClient) {}

	public get points(): Observable<Spot[]> {
		return this.http.get<Spot[]>(`${environment.apiUrl}/spot/all`);
	}

	public set clusterGroup(newClusterGroup: MarkerClusterGroup) {
		this._clusterGroup = newClusterGroup;
	}
	public get clusterGroup() {
		return this._clusterGroup;
	}

	public createSpot(name: string, description: string): void {
		const spot: Spot = {
			id: 1,
			name,
			des: description,
			coordinates: this.newCords,
		};
		const marker = new Marker(spot.coordinates);
		console.log(name);
		const layer = marker.bindPopup(`<div>nazwa: ${name}</div>
		<div>opis: ${description}</div>
		`);
		this.clusterGroup.addLayer(layer);
		this.clusterGroup.addTo(this.map);
	}

	set cords(cords: LatLng) {
		this.newCords = cords;
	}

	set newMap(map: lMap) {
		this.map = map;
	}
}
