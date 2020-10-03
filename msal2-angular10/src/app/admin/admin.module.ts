import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AddProjectDialogComponent } from './add-project-dialog.component';
import { AddProjectUserDialogComponent } from './add-project-user-dialog.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteDialogComponent } from './delete-dialog.component';
import { ManagePermissionsComponent } from './manage-permissions.component';
import { ManageProjectsComponent } from './manage-projects.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    AdminRoutingModule,
    CoreModule
  ],
  exports: [],
  declarations: [
    ManageProjectsComponent,
    ManagePermissionsComponent,
    AddProjectDialogComponent,
    DeleteDialogComponent,
    AddProjectUserDialogComponent
  ],
  providers: [],
  entryComponents: [
    AddProjectDialogComponent,
    DeleteDialogComponent,
    AddProjectUserDialogComponent
  ]
})
export class AdminModule {}
