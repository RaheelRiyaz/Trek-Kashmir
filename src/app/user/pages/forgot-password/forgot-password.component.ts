import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notyf } from 'notyf';
import { resetCodeRequest } from 'src/app/Models/user';
import { NOTYF } from 'src/app/Security/notyf.token';
import { UserService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userEmail!: string;
  code: resetCodeRequest = new resetCodeRequest();
  showEmail: boolean = true;
  showCode: boolean = false;
  showPassword: boolean = false;
  constructor(private userService: UserService,@Inject(NOTYF) private notyf:Notyf) { }

  ngOnInit(): void {
  }
  forgetpassword(forgetPass: NgForm) {
    this.userService.resetPassword(this.userEmail).subscribe(response => {
      if (response.isSuccess) {
        localStorage["resetEmail"] = this.userEmail;
        this.showEmail=false;
        this.showCode=true;
      }
      else{
        this.notyf.error(response.message)
      }
    })
  }


  reset(code: NgForm) {
    this.code.email = localStorage.getItem("resetEmail")
    this.userService.resetCode(this.code).subscribe(response => {
      if (response.isSuccess) {
        localStorage["resetId"] = response.result.id;
      }
    })

  }



}
