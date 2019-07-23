import { HomeComponent } from './home/home.component';
import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'flight-booking',
        loadChildren: () => import('./flight-booking/flight-booking.module').then(m => m.FlightBookingModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];