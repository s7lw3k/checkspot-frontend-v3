import {
	AfterViewInit,
	Component,
	EventEmitter,
	Injector,
	Input,
	NgZone,
	OnDestroy,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import {
	Map,
	Control,
	DomUtil,
	ZoomAnimEvent,
	Layer,
	MapOptions,
	tileLayer,
	latLng,
	LeafletEvent,
	latLngBounds,
	Popup,
	LatLng,
	MarkerClusterGroup,
} from 'leaflet';
import { NewSpotComponent } from './new-spot-popup/new-spot-popup.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommonModule } from '@angular/common';
import { SpotService } from '../services/spot.service';
import { PopupService } from '../services/popup.service';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'cs-map',
	// templateUrl: './map.component.html',
	template: `
		<div class="map-container">
			<div class="map-frame">
				<div
					id="map"
					leaflet
					[leafletOptions]="options"
					(leafletMapReady)="onMapReady($event)"
					(leafletMapZoomEnd)="onMapZoomEnd($event)"
				></div>
			</div>
			<ng-template #popupContent></ng-template>
			<new-spot-popup></new-spot-popup>
		</div>
		<button style="z-index: 10000; position: relative; margin: 20px;" mat-raised-button (click)="genRandomSpots()">GenLos</button>
	`,
	styleUrls: ['./map.component.scss'],
	standalone: true,
	imports: [NewSpotComponent, LeafletModule, CommonModule, LeafletMarkerClusterModule, MatButtonModule],
})
export class MapComponent implements OnInit, OnDestroy {
	private clusterGroup: MarkerClusterGroup;
	private bounds = latLngBounds([
		[50, 19.8],
		[50.15, 20.2],
	]);

	@ViewChild('popupContent')
	popContent: TemplateRef<NewSpotComponent>;
	@Input() options: MapOptions = {
		layers: [
			tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				minZoom: 13,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				bounds: this.bounds,
			}),
		],
		zoom: 1,
		center: latLng(0, 0),
	};
	private map: Map;
	private popup: Popup = new Popup();
	private zoom: number = 0;
	constructor(
		private spotService: SpotService,
		private popupService: PopupService
	) {}

	ngOnInit() {
		this.clusterGroup = new MarkerClusterGroup({removeOutsideVisibleBounds: true});
		this.spotService.clusterGroup = this.clusterGroup;
	}

	ngOnDestroy() {
		this.map.clearAllEventListeners;
		this.map.remove();
	}
	public onMapReady(map: Map) {
		this.map = map;
		this.spotService.newMap = this.map;
		this.zoom = map.getZoom();

		this.map.setView([50.05, 19.95], 13);

		this.map.setMaxBounds(this.bounds);

		this.map.on('click', this.addPin);
	}

	public onMapZoomEnd(e: LeafletEvent) {
		this.zoom = e.target.getZoom();
	}

	private addPin = (event: any) => {
		this.spotService.cords = event.latlng;
		this.popupService.newPopup = this.popup;

		this.popup
			.setLatLng(event.latlng)
			.setContent(this.popContent.elementRef.nativeElement.nextElementSibling)
			.openOn(this.map);
	};

	public genRandomSpots(): void {
		for (let i = 0; i < 50; i++) {
			this.spotService.cords = {
				lat: Math.random() * 0.15 + 50,
				lng: Math.random() * 0.4 + 19.8
			} as LatLng;
			this.spotService.createSpot('losT','losD')
		}
	}
}
