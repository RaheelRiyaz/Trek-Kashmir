import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './client.component';
import { PackagesComponent } from './components/Package/packages/packages.component';
import { PackageBookingComponent } from './components/Package/package-booking/package-booking.component';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';
import { PackageDetailsComponent } from '../shared/components/package-details/package-details.component';
import { TrekingGearsComponent } from './pages/treking-gears/treking-gears.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { TreksComponent } from '../shared/components/treks/treks.component';
import { IternaryComponent } from '../shared/components/iternary/iternary.component';
import { TrekListComponent } from '../shared/components/trek-list/trek-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { VideoComponent } from '../shared/components/video/video.component';

const routes: Routes = [
  {path:'',component:ClientComponent,children:[
    {path:'',redirectTo:"home",pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'payments',component:PaymentsPageComponent},
    {path:'bookings',component:BookingComponent},
    {path:"packages",children:[
      {path:"",component:PackagesComponent},
      {path:':id',component:PackageBookingComponent},
      {path:"details/:id",component:PackageDetailsComponent},
      {path:"treks/:id",component:TreksComponent},
      {path:"iternary/:id",component:IternaryComponent},
      {path:"treks/video/:url",component:VideoComponent},
    ]},
    {path:"trekkinggears",children:[
      {path:"",component:TrekingGearsComponent},
      {path:"product/:id",component:ProductViewComponent},
    ]},
    {path:"cart",component:CartComponent},
    {path:"treks",component:TrekListComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { } 
