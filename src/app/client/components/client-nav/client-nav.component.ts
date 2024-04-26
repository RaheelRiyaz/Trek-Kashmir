import { NgFor } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/Models/changePassword';
import { UpdateModel } from 'src/app/Models/updateAccount';
import { AccountsService } from 'src/app/Services/accounts.service';
import { CartItemEmitterService } from 'src/app/Services/cartItemEmitterService';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-client-nav',
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.css'],
})
export class ClientNavComponent {
  constructor(
    private route: Router,
    private service: AccountsService,
    private emitterService: CartItemEmitterService
  ) {}
  loggedInUser: any;
  cartItemCount: number = localStorage.getItem('gear-cart')
    ? JSON.parse(localStorage['gear-cart']).length
    : [].length;
  baseUrl = environment.baseImagePath;
  ngOnInit(): void {
    this.getDetails();
    this.emitterService.cartItemCountEmitter.subscribe(
      (count) => (this.cartItemCount = count)
    );
  }
  getDetails(): void {
    this.service.accountById().subscribe({
      next: (response) => {
        console.log(response);
        
        this.loggedInUser = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  extensions: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  changePasswordModel: ChangePassword = new ChangePassword();
  @ViewChild('profilePicture') profilePicture!: ElementRef;
  @ViewChild('settingsModal') settingsModal!: ElementRef;
  @ViewChild('profileModal') profileModal!: ElementRef;
  toggler: string = 'none';
  showSelectedImage(e: any) {
    console.log(e.target.value);
    this.profilePicture.nativeElement.src = e.target.files[0].name;
  }
  getImg(event: any) {
    this.profilePicture.nativeElement.src = URL.createObjectURL(
      event.target.files[0]
    );
  }

  accountUpdate(formData: UpdateModel): void {
    this.service.updateAccount(formData).subscribe({
      next: (response) => {
        this.getDetails();
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            title: response.message,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateProfilePicture(file: any): void {
    if (file.files.length > 0) {
      if (this.extensions.includes(file.files[0].type.toLowerCase())) {
        console.log(file.files[0]);
        const formData = new FormData();
        formData.append('file', file.files[0]);
        this.service.uploadPicture(formData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              environment.Toast.fire({
                title: response.message,
                icon: 'success',
                timer: 500,
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        environment.Toast.fire({
          icon: 'error',
          title: 'Please select image in jpg jpeg or png format',
        });
      }
    } else {
      environment.Toast.fire({
        icon: 'error',
        title: 'Please select your profile picture',
      });
    }
  }
  logoutConfirmation() {
    this.toggler = 'none';
    Swal.fire({
      title: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('trek-kashmir-token');
        this.route.navigate(['/']);
      }
    });
  }
  changePassword(): void {
    this.service.changePassword(this.changePasswordModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            title: response.result,
          });
          this.settingsModal.nativeElement.classList.replace('show', 'hide');
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
