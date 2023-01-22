import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from "./components/handlers/page-not-found/page-not-found.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppInterceptor} from "./components/authentication/app-interceptor";
import {LoginGuard} from "./components/authentication/login-guard";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {InfoComponent} from "./components/info/info.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import {NewPasswordComponent} from "./components/user/new-password/new-password.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {UsersComponent} from "./components/admin/users/users.component";
import {MatSortModule} from "@angular/material/sort";
import {UserEditDialogComponent} from "./components/admin/users/user-edit-dialog/user-edit-dialog.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {
  AttendanceWorkReportComponent
} from "./components/work-time-report/attendance-work-report/attendance-work-report.component";
import {ProfileComponent} from "./components/user/profile/profile-component";
import {ProfileGuard} from "./components/authentication/profile-guard";
import {ProfileDataComponent} from "./components/user/profile/data/profile-data.component";
import {ProfilePasswordComponent} from "./components/user/profile/password/profile-password.component";
import {AnonymousGuard} from "./components/authentication/anonymous-guard";

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SideMenuComponent,
    UsersComponent,
    UserEditDialogComponent,
    ConfirmationDialogComponent,
    AttendanceWorkReportComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfilePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 4500,
        horizontalPosition: "center",
        verticalPosition: "top"
      }
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    LoginGuard, ProfileGuard, AnonymousGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
