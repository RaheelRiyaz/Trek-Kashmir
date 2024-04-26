import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from 'src/app/Models/signup';
import { AccountsService } from 'src/app/Services/accounts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
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
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['/admin']);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Can't create account.. Some error occured",
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
