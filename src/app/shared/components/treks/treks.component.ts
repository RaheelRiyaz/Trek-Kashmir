import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-treks',
  templateUrl: './treks.component.html',
  styleUrls: ['./treks.component.css'],
})
export class TreksComponent {
  constructor(
    private service: TreksService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}
  token: any;
  trekList: any;
  packageId!: string;
  baseUrl=environment.baseImagePath;
  ngOnInit(): void {
    this.token = environment.getToken();
    this.activatedRoute.params.subscribe({
      next: (response) => {
        console.log(response);
        
        this.packageId = response['id'];
      },
    });
    this.service.getTreksByPackageId(this.packageId).subscribe({
      next: (response) => {
        console.log(response);
        
        this.trekList = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToIternary(id: string) {
    if (this.token) {
      this.route.navigate(['/client/packages/iternary/' + id]);
    } else {
      this.route.navigate(['/packages/treks/iternary/' + id]);
    }
  }
  // buyPackage(id: string) {
  //   if (this.token) {
  //     this.route.navigate(['/client/packages/' + id]);
  //   } else {
  //     this.route.navigate(['/login']);
  //   }
  // }
  bookPackage(id: string) {
    if (
      environment.getToken() &&
      environment.getToken().token &&
      environment.getToken().userRole === UserRole.Client
    ) {
      this.route.navigate(['/client/packages/' + id]);
    } else {
      sessionStorage.setItem('packageId', id);
      this.route.navigate(['/login']);
    }
  }
}
