import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import {
	BrowserAnimationsModule,
	provideAnimations,
} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterPanelComponent } from './login/register-panel/register-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { NewSpotComponent } from './map/new-spot-popup/new-spot-popup.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MapComponent,
		LoginComponent,
		BrowserAnimationsModule,
		RegisterPanelComponent,
		HttpClientModule,
		NewSpotComponent,
	],
	providers: [provideAnimations()],
	bootstrap: [AppComponent],
})
export class AppModule {}
