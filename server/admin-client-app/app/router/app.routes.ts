import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from '../components/home/home.component';
import { AdminComponent }              from '../components/admin/admin.component';
import { UnauthorizedComponent }       from '../components/unauthorized/unauthorized.component';
import { AuthGuard }                   from '../services/auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
       AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
