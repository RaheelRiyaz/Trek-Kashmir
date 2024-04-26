import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateGear } from 'src/app/Models/TrekingGears/updategear';
import { TrekinggearsService } from 'src/app/Services/trekinggears.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-gear',
  templateUrl: './edit-gear.component.html',
  styleUrls: ['./edit-gear.component.css'],
})
export class EditGearComponent {
  constructor(
    private service: TrekinggearsService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}
  id!: string;
  updateGear: UpdateGear = new UpdateGear();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });

    this.service.getTrekingGearsById(this.id).subscribe({
      next: (response) => {
        const { id, name, description, pricePerDay, size, quantity } =
          response.result;
        this.updateGear.id = id;
        this.updateGear.name = name;
        this.updateGear.description = description;
        this.updateGear.pricePerDay = pricePerDay;
        this.updateGear.pricePerDay = pricePerDay;
        this.updateGear.size = size;
        this.updateGear.quantity = quantity;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateGearDetails(): void {
    this.service.updategear(this.updateGear).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.Toast.fire({
            icon: 'success',
            title: 'Trek Updated successfully',
            timer: 500,
          });
          this.route.navigate(['/admin/trekkingears']);
        }
        else{
          environment.Toast.fire({
            icon: 'error',
            title: 'There is some issue try again later',
            timer: 500,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async selectImage() {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        multiple: 'multiple',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const formData = new FormData();
      for (const f of file) {
        formData.append('file', f);
      }
      formData.append('entityId', this.id);
      this.service.postFile(formData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.Toast.fire({
              icon: 'success',
              timer: 500,
              title: 'Files uploaded successfully.',
            });
            this.route.navigate(['/admin/trekkingears'])
          } else {
            environment.Toast.fire({
              icon: 'error',
              timer: 500,
              title: 'There is some issue please try later.',
            });
          }
        },
        error: () => {
          environment.Toast.fire({
            icon: 'error',
            timer: 500,
            title: 'There is some issue please try later.',
          });
        },
      });
    }
  }
}
