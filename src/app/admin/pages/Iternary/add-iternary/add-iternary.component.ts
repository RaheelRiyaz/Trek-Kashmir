import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/userRole';
import { AccountsService } from 'src/app/Services/accounts.service';
import { HotelsService } from 'src/app/Services/hotels.service';
import { IternaryService } from 'src/app/Services/iternary.service';
import { PackageService } from 'src/app/Services/package.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-iternary',
  templateUrl: './add-iternary.component.html',
  styleUrls: ['./add-iternary.component.css']
})
export class AddIternaryComponent {
  constructor(
    private service: HotelsService,
    private iternaryService: IternaryService,
    private route: Router,
    private activatedRoute:ActivatedRoute
  ) {}
  hotels: any;
  trekId!:string;
  ngOnInit(): void {
this.activatedRoute.params.subscribe({
  next:(response)=>{
this.trekId=response["trekId"]
  }
})
    this.service.getHotels().subscribe({
      next: (response) => {
        console.log(response);
        this.hotels = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addIternary(form: any) {
    const formData = new FormData(form);
    formData.append("trekId",this.trekId)
    formData.forEach((value, key) =>{
      console.log(value);
      console.log(key);
      
    });
    this.iternaryService.postItenary(formData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            timer: 500,
            title: 'Iternary added Successfully',
          });
          this.route.navigate([`/admin/treks/iternary/${this.trekId}`]);
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
