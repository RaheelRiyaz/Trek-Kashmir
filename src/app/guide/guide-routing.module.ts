import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideNavComponent } from './components/guide-nav/guide-nav.component';
import { GuideHomeComponent } from './components/home/home.component';
import { GuideComponent } from './guide.component';
import { GuideAccountComponent } from './pages/settings/guide-account/guide-account.component';
import { GuideChangePasswordComponent } from './pages/settings/guide-change-password/guide-change-password.component';
import { GuideClientsComponent } from './Pages/guide-clients/guide-clients.component';
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { GPackagesComponent } from './pages/g-packages/g-packages.component';
import { GTrekImagesComponent } from './Pages/Trek/g-trek-images/g-trek-images.component';
import { GDestinationsComponent } from './Pages/Trek/g-destinations/g-destinations.component';
import { PackageDetailsComponent } from '../shared/components/package-details/package-details.component';
import { GBookingsComponent } from './Pages/g-bookings/g-bookings.component';
import { GListComponent } from './Pages/Iternary/g-list/g-list.component';

const routes: Routes = [
  {
    path: '', component: GuideComponent, children: [
      {
        path: '', component: GuideHomeComponent
      },
      // {
      //   path: "settings/account", component: GuideAccountComponent
      // },
      // {
      //   path: "settings/changePassword", component: GuideChangePasswordComponent
      // },
      {
        path: "settings",
        children: [
          //Change Password
          {
            path: "account", component: GuideAccountComponent
          },
          {
            path: "changePassword", component: GuideChangePasswordComponent
          }
        ]
      },
      {
        path: "clients", component: GuideClientsComponent
      },
      {
        path: "clientDetails/:id", component: ClientDetailsComponent
      },
      {
        path: "packages", component: GPackagesComponent
      },
      {
        path: 'treks',
        children: [
          {
            path: ':id',
            component: GDestinationsComponent,
          },
          {
            path: 'images/:id',
            component: GTrekImagesComponent,
          },
          {
            path: 'iternary',
            children: [
              {
                path: ':id',
                component: GListComponent,
              },
            ],
          },
        ],
      },

      {
        path: 'packages',
        children: [
          {
            path: '',
            component: GPackagesComponent,
          },
          {
            path: 'details/:id',
            component: PackageDetailsComponent,
          },
          { path: 'bookings/:id', component: GBookingsComponent },
          // { path: 'images/:id', component: ImagesComponent },
          // { path: 'edit/:id', component: UpdateComponent },
          // { path: 'add', component: AddComponent },
        ],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
