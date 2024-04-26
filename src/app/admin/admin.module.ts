import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { GetHotelsComponent } from './pages/Hotel/get-hotels/get-hotels.component';
import { PostHotelComponent } from './pages/Hotel/post-hotel/post-hotel.component';
import { PuthotelComponent } from './pages/Hotel/puthotel/puthotel.component';
import { DestinationsComponent } from './pages/Trek/destinations/destinations.component';
import { PackagesComponent } from './pages/Package/packages/packages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './pages/settings/account/account.component';
import { ChangePasswordComponent } from './pages/settings/change-password/change-password.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { GetClientsComponent } from './pages/client/get-clients/get-clients.component';
import { GetEmployeesComponent } from './pages/emplpoyees/get-employees/get-employees.component';
import { UpdateDestinationComponent } from './pages/Trek/update-destination/update-destination.component';
import { AddTrekComponent } from './pages/Trek/add-trek/add-trek.component';
import { ListComponent } from './pages/Iternary/list/list.component';
import { TrekImagesComponent } from './pages/Trek/trek-images/trek-images.component';
import { ImagesComponent } from './pages/Package/images/images.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { UpdateComponent } from './pages/Package/update/update.component';
import { AddComponent } from './pages/Package/add/add.component';
import { AddIternaryComponent } from './pages/Iternary/add-iternary/add-iternary.component';
import { EditGearComponent } from './pages/TrekingGears/edit-gear/edit-gear.component';
import { GearsListComponent } from './pages/TrekingGears/list/list.component';
import { AddGearComponent } from './pages/TrekingGears/add-gear/add-gear.component';
import { DetailsComponent } from './pages/userDetails/details/details.component';
import { PaymentMethodPipe } from '../Pipes/status.pipe';
import { UpdateIternaryComponent } from './pages/Iternary/update-iternary/update-iternary.component';


@NgModule({
  declarations: [
    DetailsComponent,
    AdminComponent,
    AdminNavComponent,
    DashboardComponent,
    SignupComponent,
    GetHotelsComponent,
    PostHotelComponent,
    PuthotelComponent,
    DestinationsComponent,
    PackagesComponent,
    AccountComponent,
    ChangePasswordComponent,
    EditClientComponent,
    AddAccountComponent,
    GetClientsComponent,
    GetEmployeesComponent,
    UpdateDestinationComponent,
    AddTrekComponent,
    TrekImagesComponent,
    ImagesComponent,
    BookingsComponent,
    UpdateComponent,
    AddComponent,
    AddIternaryComponent,
    ListComponent,
    EditGearComponent,
    GearsListComponent,
    AddGearComponent,
    UpdateIternaryComponent,
    // PaymentMethodPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
