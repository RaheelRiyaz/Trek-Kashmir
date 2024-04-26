import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsService } from './Services/accounts.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './Services/interceptor.service';
import { FormsModule } from '@angular/forms';
import { CartItemEmitterService } from './Services/cartItemEmitterService';
import { PaymentMethodPipe } from './Pipes/status.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [
    AccountsService,
    CartItemEmitterService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
