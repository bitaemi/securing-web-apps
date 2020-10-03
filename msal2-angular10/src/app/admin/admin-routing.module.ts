import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProjectsComponent } from './manage-projects.component';
import { ManagePermissionsComponent } from './manage-permissions.component';
import { AdminRouteGuard } from '../core/admin-route-guard';

const routes: Routes = [
  { path: 'admin', component: ManageProjectsComponent,
      canActivate: [AdminRouteGuard] },
  { path: 'admin/manage-permissions/:projectId', component: ManagePermissionsComponent,
      canActivate: [AdminRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [ManageProjectsComponent];