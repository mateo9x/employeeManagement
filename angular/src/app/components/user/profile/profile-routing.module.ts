import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileDataComponent} from "./data/profile-data.component";
import {ProfileGuard} from "../../authentication/profile-guard";
import {ProfilePasswordComponent} from "./password/profile-password.component";

const profileRoutes: Routes = [
  { path: 'profile-data', component: ProfileDataComponent, canActivate: [ProfileGuard] },
  { path: 'profile-password', component: ProfilePasswordComponent, canActivate: [ProfileGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {

}
