import { Component } from '@angular/core';
import { ChangePassword } from 'src/app/Models/changePassword';
import { AccountsService } from 'src/app/Services/accounts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guide-change-password',
  templateUrl: './guide-change-password.component.html',
  styleUrls: ['./guide-change-password.component.css']
})
export class GuideChangePasswordComponent {
  constructor(private service: AccountsService) { }
  changePasswordModel: ChangePassword = new ChangePassword();
  changePassword(): void {
    this.service.changePassword(this.changePasswordModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            title: response.result,
          });
        } else {
          environment.Toast.fire({
            icon: 'error',
            title: response.message,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
