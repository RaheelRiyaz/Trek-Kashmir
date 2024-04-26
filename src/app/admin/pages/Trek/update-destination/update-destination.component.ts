import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { UpdateTrek } from 'src/app/Models/TrekModels/updateTrek';
import { AccountsService } from 'src/app/Services/accounts.service';
import { PackageService } from 'src/app/Services/package.service';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-destination',
  templateUrl: './update-destination.component.html',
  styleUrls: ['./update-destination.component.css'],
})
export class UpdateDestinationComponent implements OnInit {
  constructor(
    private service: TreksService,
    private packageService: PackageService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountsService,
    private route:Router
  ) {}
  updateTrekModel: UpdateTrek = new UpdateTrek();
  packages: any;
  trekId!: string;
  guides: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.trekId = response['id'];
      },
    });
    this.packageService.getpackages().subscribe({
      next: (response) => {
        this.packages = response.result;
      },
    });

    this.service.getTreksById(this.trekId).subscribe({
      next: (response) => {
        console.log(response);
        response = response.result;
        this.updateTrekModel.description = response.description;
        this.updateTrekModel.name = response.name;
        this.updateTrekModel.endDate = response.endDate;
        this.updateTrekModel.startDate = response.startDate;
        this.updateTrekModel.latitude = response.latitude;
        this.updateTrekModel.longitude = response.longitude;
        this.updateTrekModel.id = response.id;
        this.updateTrekModel.packageId = response.packageId;
      },
      error: (err) => {
        console.log(err);
      },
    });
        
  }
  updateTrek(): void {
    this.service.updateTrek(this.updateTrekModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            title: 'Trek Updated Successfully',
          });
          this.route.navigate([`/admin/treks/${response.result.packageId}`])
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
