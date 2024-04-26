import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserHomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    SignupComponent,
    UserHomeComponent,
    LoginComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[]
})
export class UserModule { }
