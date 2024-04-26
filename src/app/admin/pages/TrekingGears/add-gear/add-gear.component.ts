import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-gear',
  templateUrl: './add-gear.component.html',
  styleUrls: ['./add-gear.component.css'],
})
export class AddGearComponent {
  constructor(private service: TrekinggearsService, private route: Router) {}
  ngOnInit(): void {}
  addGear(form: any) {
    const formData = new FormData(form);
    this.service.addTrekingGear(formData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            timer: 500,
            title: 'Trekking Gear added Successfully',
          });
          this.route.navigate([`/admin/trekkinggears`]);
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
