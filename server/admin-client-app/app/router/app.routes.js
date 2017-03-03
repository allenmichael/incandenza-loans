"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('../components/home/home.component');
var admin_component_1 = require('../components/admin/admin.component');
var unauthorized_component_1 = require('../components/unauthorized/unauthorized.component');
var auth_guard_1 = require('../services/auth/auth.guard');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'unauthorized', component: unauthorized_component_1.UnauthorizedComponent },
    { path: '**', redirectTo: '' }
];
exports.appRoutingProviders = [
    auth_guard_1.AuthGuard
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map