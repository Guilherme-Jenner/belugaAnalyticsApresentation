
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DispositivosComponent} from "./dispositivos/dispositivos.component";


export const routes: Routes = [
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
      path: 'dispositivo',
      component: DispositivosComponent
    }
];
