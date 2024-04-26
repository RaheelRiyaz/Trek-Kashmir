import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { PackagesComponent } from './components/Package/packages/packages.component';
import { PackageBookingComponent } from './components/Package/package-booking/package-booking.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { TrekingGearsComponent } from './pages/treking-gears/treking-gears.component';
import { CartComponent } from './pages/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientNavComponent } from './components/client-nav/client-nav.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AppPaymentStatusPipe, BookingStatusPipe, PaymentMethodPipe } from '../Pipes/status.pipe';

@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    PackagesComponent,
    PackageBookingComponent,
    PaymentsPageComponent,
    PaymentSuccessComponent,
    TrekingGearsComponent,
    CartComponent,
    FooterComponent,
    ClientNavComponent,
    ProductViewComponent,
    BookingComponent,
    AppPaymentStatusPipe,
    // PaymentMethodPipe
  ],
  imports: [CommonModule, ClientRoutingModule,FormsModule,SharedModule],
})
export class ClientModule {}
