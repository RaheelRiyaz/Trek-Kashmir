import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/Models/changePassword';
import { UpdateModel } from 'src/app/Models/updateAccount';
import { AccountsService } from 'src/app/Services/accounts.service';
import { CartItemEmitterService } from 'src/app/Services/cartItemEmitterService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guide-account',
  templateUrl: './guide-account.component.html',
  styleUrls: ['./guide-account.component.css']
})
export class GuideAccountComponent {
  constructor(
    private route: Router,
    private service: AccountsService,
    private sharedService: CartItemEmitterService
  ) {}
  loggedInUser: any;
  baseUrl:string=environment.baseImagePath;
  ngOnInit(): void {
    this.getDetails();
  }
  getDetails(): void {
    this.service.accountById().subscribe({
      next: (response) => {
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
        const formData = new FormData();
        formData.append('file', file.files[0]);
        this.service.uploadPicture(formData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.sharedService.profileChanged.emit(
                this.baseUrl + response.result.filePath
              );
              environment.Toast.fire({
                title: response.message,
                icon: 'success',
                timer: 500,
              });
            } else {
              environment.Toast.fire({
                title: response.result.message,
                icon: 'error',
                timer: 500,
              });
            }
          },
          error: (err) => {
            environment.Toast.fire({
              title: err.result.message,
              icon: 'error',
              timer: 500,
            });
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
}
