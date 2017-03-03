import { NgModule }                from '@angular/core';
import { BrowserModule  }          from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AUTH_PROVIDERS }          from 'angular2-jwt';

import { AppComponent }            from './components/app/app.component';
import { HomeComponent }           from './components/home/home.component';
import { AdminComponent }          from './components/admin/admin.component';
import { UnauthorizedComponent }   from './components/unauthorized/unauthorized.component';
import { CustomerFooterComponent }   from './components/shared/footer/customer-footer.component';
import { routing,
         appRoutingProviders }     from './router/app.routes';

import { Auth } from './services/auth/auth.service'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        UnauthorizedComponent,
        CustomerFooterComponent
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS,
        Auth
    ],
    imports:      [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
