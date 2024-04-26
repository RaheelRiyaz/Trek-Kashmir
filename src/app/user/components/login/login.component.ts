import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { ForgotPassword } from 'src/app/Models/forgotPassword';
import { Login } from 'src/app/Models/login';
import { AccountsService } from 'src/app/Services/accounts.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private service: AccountsService, private route: Router) {}
  loginModel: Login = new Login();
  forgotPassword: ForgotPassword = new ForgotPassword();
  login(): void {
    this.service.login(this.loginModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          sessionStorage.setItem(
            'trek-kashmir-token',
            JSON.stringify(response.result)
          );
          environment.Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          });
          if (sessionStorage['packageId']) {
            this.route.navigate([
              '/client/packages/' + sessionStorage['packageId'],
            ]);
            sessionStorage.removeItem('packageId');
          } else {
            switch (response.result.userRole) {
              case UserRole.Admin:
                this.route.navigate(['/admin']);
                break;
              case UserRole.Client:
                this.route.navigate(['/client']);
                break;
              case UserRole.Guide:
                this.route.navigate(['/guide']);
            }
          }
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
  async fireSwal() {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      width: '30rem',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });

    if (email) {
      this.forgotPassword.email = email;
      this.service.forgotPassword(this.forgotPassword).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            environment.Toast.fire({
              icon: 'success',
              title: response.message,
              timer: 500,
            });
          } else {
            environment.Toast.fire({
              icon: 'error',
              title: response.message,
              timer: 500,
            });
          }
        },
        error: (err) => {
          environment.Toast.fire({
            icon: 'error',
            title: err.message,
            timer: 800,
          });
        },
      });
      // Swal.fire(`Entered email: ${email}`);
    }
  }
}
