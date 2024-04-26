import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { UpdatePackage } from 'src/app/Models/Package/updatePackage';
import { AccountsService } from 'src/app/Services/accounts.service';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  constructor(
    private service: PackageService,
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private route: Router
  ) {}
  guides: any;
  updateModel: UpdatePackage = new UpdatePackage();
  ngOnInit(): void {
    this.accountsService.getAccountsByUserRole(UserRole.Guide).subscribe({
      next: (response) => {
        this.guides = response.result;
      },
    });
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.updateModel.id = response['id'];
      },
    });

    this.service.getpackageByid(this.updateModel.id).subscribe({
      next: (response) => {
        const {
          description,
          endDate,
          startDate,
          groupSize,
          name,
          price,
          packageBookingStatus,
          guideId,
        } = response.result;
        this.updateModel.description = description;
        this.updateModel.endDate = endDate;
        this.updateModel.groupSize = groupSize;
        this.updateModel.name = name;
        this.updateModel.startDate = startDate;
        this.updateModel.price = price;
        this.updateModel.packageBookingStatus = packageBookingStatus;
        this.updateModel.guideId = guideId;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updatePackage(): void {
    console.log(this.updateModel);
    
    this.service.updatePackage(this.updateModel).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          environment.Toast.fire({
            title: 'Package updated successfully',
            icon: 'success',
          });
          this.route.navigate(['/admin/packages']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
