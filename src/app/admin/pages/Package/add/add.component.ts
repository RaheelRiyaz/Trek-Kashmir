import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { AccountsService } from 'src/app/Services/accounts.service';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private service: AccountsService,
    private packageService: PackageService,
    private route: Router
  ) {}
  guides: any;
  ngOnInit(): void {
    this.service.getAccountsByUserRole(UserRole.Guide).subscribe({
      next: (response) => {
        console.log(response);
        this.guides = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addPackage(form: any) {
    const formData = new FormData(form);
    this.packageService.addPackage(formData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            timer: 500,
            title: 'Package added Successfully',
          });
          this.route.navigate(['/admin/packages']);
        } else {
          environment.Toast.fire({
            icon: 'error',
            title: 'There is some issue please try gain later',
            timer: 500,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
