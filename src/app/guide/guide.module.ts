import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { GuideNavComponent } from './components/guide-nav/guide-nav.component';
import { GuideHomeComponent } from './components/home/home.component';
import { GuideAccountComponent } from './pages/settings/guide-account/guide-account.component';
import { FormsModule } from '@angular/forms';
import { GuideChangePasswordComponent } from './pages/settings/guide-change-password/guide-change-password.component';
import { GuideClientsComponent } from './Pages/guide-clients/guide-clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { GPackagesComponent } from './pages/g-packages/g-packages.component';
import { GDestinationsComponent } from './Pages/Trek/g-destinations/g-destinations.component';
import { GTrekImagesComponent } from './Pages/Trek/g-trek-images/g-trek-images.component';
import { GListComponent } from './Pages/Iternary/g-list/g-list.component';
import { GBookingsComponent } from './Pages/g-bookings/g-bookings.component';



@NgModule({
  declarations: [
    GuideComponent,
    GuideNavComponent,
    GuideHomeComponent,
    GuideAccountComponent,
    GuideChangePasswordComponent,
    GuideClientsComponent,
    ClientDetailsComponent,
    GPackagesComponent,
    GDestinationsComponent,
    GTrekImagesComponent,
    GListComponent,
    GBookingsComponent,
  ],
  imports: [
    CommonModule,
    GuideRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class GuideModule { }
