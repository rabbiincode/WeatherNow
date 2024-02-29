import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
  { path: '', title: "Today's Weather", component: HomeComponent },
  { path: 'weather/:location', title: 'Weather', component: WeatherComponent },
];
