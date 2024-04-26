import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Signup } from 'src/app/Models/signup';
import { AccountsService } from 'src/app/Services/accounts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private service: AccountsService, private route: Router) { }
  signupModel: Signup = new Signup();
  signup(): void {
    console.log(this.signupModel);
    this.service.signUp(this.signupModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Account created successfully please login",
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['/login']);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {

  }


}
