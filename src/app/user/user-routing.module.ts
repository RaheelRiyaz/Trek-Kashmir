import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AllPackagesComponent } from '../shared/components/all-packages/all-packages.component';
import { PackageDetailsComponent } from '../shared/components/package-details/package-details.component';
import { TreksComponent } from '../shared/components/treks/treks.component';
import { PackageBookingComponent } from '../shared/components/package-booking/package-booking.component';
import { IternaryComponent } from '../shared/components/iternary/iternary.component';
import { TrekListComponent } from '../shared/components/trek-list/trek-list.component';
import { VideoComponent } from '../shared/components/video/video.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomeComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'treks', component: TrekListComponent },
      {
        path: 'packages',
        children: [
          { path: '', component: AllPackagesComponent },
          { path: 'details/:id', component: PackageDetailsComponent },
          { path: 'treks/:id', component: TreksComponent },
          { path: 'book/:id', component: PackageBookingComponent },
          { path: 'treks/iternary/:id', component: IternaryComponent },
          { path: 'treks/video/:url', component: VideoComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
