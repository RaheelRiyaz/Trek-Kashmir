import { Component } from '@angular/core';
import { DemoUser } from '../Models/DemoUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user: DemoUser = new DemoUser();
  show(): void {
    console.log(this.user);
  }
}
