import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from 'src/app/Models/changePassword';
import { AccountsService } from 'src/app/Services/accounts.service';
import { CartItemEmitterService } from 'src/app/Services/cartItemEmitterService';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
})
export class AdminNavComponent {
  constructor(
    private route: Router,
    private service: AccountsService,
    private sharedService: CartItemEmitterService
  ) { }
  filePath: string = '';
  User!: string;
  ngOnInit(): void {
    this.sharedService.profileChanged.subscribe((res) => {
      this.filePath = res;
    });
    this.service.accountById().subscribe({
      next: (response) => {
        console.log(response);
        this.User = response.result.name;

        this.filePath = environment.baseImagePath + response.result.filePath;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  color: string = 'white';
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  logoutConfirmation() {
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
}
