import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { GuideModule } from './guide/guide.module';
import { ClientAuthGuard } from './Security/client.guard';
import { AdminAuthGuard } from './Security/admin.guard';

const routes: Routes = [
  {path:"",loadChildren:()=>UserModule},
  {path:"admin",loadChildren:()=>AdminModule,canActivate:[AdminAuthGuard]},
  {path:"client",loadChildren:()=>ClientModule,canActivate:[ClientAuthGuard]},
  {path:"guide",loadChildren:()=>GuideModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
