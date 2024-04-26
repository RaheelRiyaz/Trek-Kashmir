import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GetHotelsComponent } from './pages/Hotel/get-hotels/get-hotels.component';
import { PostHotelComponent } from './pages/Hotel/post-hotel/post-hotel.component';
import { PuthotelComponent } from './pages/Hotel/puthotel/puthotel.component';
import { PackagesComponent } from './pages/Package/packages/packages.component';
import { DestinationsComponent } from './pages/Trek/destinations/destinations.component';
import { UpdateDestinationComponent } from './pages/Trek/update-destination/update-destination.component';
import { PackageDetailsComponent } from '../shared/components/package-details/package-details.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { AccountComponent } from './pages/settings/account/account.component';
import { ChangePasswordComponent } from './pages/settings/change-password/change-password.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { GetClientsComponent } from './pages/client/get-clients/get-clients.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { GetEmployeesComponent } from './pages/emplpoyees/get-employees/get-employees.component';
import { AddTrekComponent } from './pages/Trek/add-trek/add-trek.component';
import { ListComponent } from './pages/Iternary/list/list.component';
import { TrekImagesComponent } from './pages/Trek/trek-images/trek-images.component';
import { ImagesComponent } from './pages/Package/images/images.component';
import { UpdateComponent } from './pages/Package/update/update.component';
import { AddComponent } from './pages/Package/add/add.component';
import { AddIternaryComponent } from './pages/Iternary/add-iternary/add-iternary.component';
import { GearsListComponent } from './pages/TrekingGears/list/list.component';
import { AddGearComponent } from './pages/TrekingGears/add-gear/add-gear.component';
import { EditGearComponent } from './pages/TrekingGears/edit-gear/edit-gear.component';
import { DetailsComponent } from './pages/userDetails/details/details.component';
import { UpdateIternaryComponent } from './pages/Iternary/update-iternary/update-iternary.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'addAccount',
        component: AddAccountComponent,
      },
      {
        path: 'clients',
        component: GetClientsComponent,
      },
      {
        path: 'employees',
        component: GetEmployeesComponent,
      },
      {
        path: 'editClient/:id',
        component: EditClientComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'hotels',
        children: [
          {
            path: '',
            component: GetHotelsComponent,
          },
          {
            path: 'addHotel',
            component: PostHotelComponent,
          },
          {
            path: 'editHotel/:id',
            component: PuthotelComponent,
          },
        ],
      },

      {
        path: 'packages',
        children: [
          {
            path: '',
            component: PackagesComponent,
          },
          {
            path: 'details/:id',
            component: PackageDetailsComponent,
          },
          { path: 'bookings/:id', component: BookingsComponent },
          { path: 'images/:id', component: ImagesComponent },
          { path: 'edit/:id', component: UpdateComponent },
          { path: 'add', component: AddComponent },
        ],
      },
      {
        path: 'treks',
        children: [
          {
            path: ':id',
            component: DestinationsComponent,
          },
          {
            path: 'edit/:id/:packageId',
            component: UpdateDestinationComponent,
          },
          {
            path: 'images/:id',
            component: TrekImagesComponent,
          },
          {
            path: 'addtrek/:packageId',
            component: AddTrekComponent,
          },
          {
            path: 'iternary',
            children: [
              {
                path: ':id',
                component: ListComponent,
              },
              {
                path: "add/:trekId", component: AddIternaryComponent
              },
              {
                path: "update" , component : UpdateIternaryComponent
              }
            ],
          },
        ],
      },
      {
        path: 'settings',
        children: [
          { path: 'profile', component: AccountComponent },
          { path: 'account', component: ChangePasswordComponent },
        ],
      },
      {
        path: 'trekkingears', children: [
          {
            path: "", component: GearsListComponent
          },
          {
            path: "add", component: AddGearComponent
          },
          {
            path: "edit/:id", component: EditGearComponent
          },
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
