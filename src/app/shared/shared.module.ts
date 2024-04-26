import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './components/packages/packages.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { PackageDetailsComponent } from './components/package-details/package-details.component';
import { GenderPipe } from '../Pipes/gender.pipe';
import { UserRolePipe } from '../Pipes/user-role.pipe';
import { AllPackagesComponent } from './components/all-packages/all-packages.component';
import { RouterModule } from '@angular/router';
import { TreksComponent } from './components/treks/treks.component';
import { PackageBookingComponent } from './components/package-booking/package-booking.component';
import { IternaryComponent } from './components/iternary/iternary.component';
import { TrekListComponent } from './components/trek-list/trek-list.component';
import { BookingStatusPipe, PaymentMethodPipe } from '../Pipes/status.pipe';
import { MapComponent } from './components/map/map.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent, BookingStatusPipe, PaymentMethodPipe, PackagesComponent, PreloaderComponent, PackageDetailsComponent, GenderPipe,UserRolePipe, AllPackagesComponent, TreksComponent, PackageBookingComponent, IternaryComponent, TrekListComponent, InputComponent],
  imports: [FormsModule,CommonModule,RouterModule],
  exports: [InputComponent,MapComponent, BookingStatusPipe, PaymentMethodPipe, RouterModule,PackagesComponent, AllPackagesComponent,PreloaderComponent, PackageDetailsComponent, GenderPipe,UserRolePipe],
})
export class SharedModule { }
