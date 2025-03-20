
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DispositivosComponent} from "./dispositivos/dispositivos.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPrateleiraComponent } from './dashboard-prateleira/dashboard-prateleira.component';


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
    },
    {
        path: 'dashboard/:lojaId',
        component: DashboardComponent
    },
    {
        path: 'dashboardPrateleira/:prateleiraId',
        component: DashboardPrateleiraComponent
    }
];
