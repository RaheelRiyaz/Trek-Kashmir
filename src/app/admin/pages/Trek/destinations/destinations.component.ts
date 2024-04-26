import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreksService } from 'src/app/Services/treks.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css'],
})
export class DestinationsComponent implements OnInit 
{
  constructor(
    private service: TreksService,
    private activatedRoute: ActivatedRoute
  ) {}
  trekList: any;
  packageId!: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['id'];
      },
    });
    this.service.getTreksByPackageId(this.packageId).subscribe({
      next: (response) => {
        this.trekList = response.result;
        console.log(this.trekList);
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fireSwal(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTrek(id).subscribe({
          next: (response) => {
            Swal.fire('Trek Deleted', '', 'success');
          },
          error: (err) => {
            Swal.fire(
              'There is something issue please try again later',
              '',
              'error'
            );
          },
        });
      }
    });
  }

  getMap() : void
  {
    
  }
}
