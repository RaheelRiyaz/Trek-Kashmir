import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-trek',
  templateUrl: './add-trek.component.html',
  styleUrls: ['./add-trek.component.css'],
})
export class AddTrekComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TreksService,
    private route: Router
  ) {}
  packageId!: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.packageId = response['packageId'];
      },
    });
  }
  addTrek(form: any) {
    const formData = new FormData(form);
    formData.append('packageId', this.packageId);
    this.service.addTrek(formData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            timer: 500,
            title: 'Trek added Successfully',
          });
          this.route.navigate([`/admin/treks/${this.packageId}`]);
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
