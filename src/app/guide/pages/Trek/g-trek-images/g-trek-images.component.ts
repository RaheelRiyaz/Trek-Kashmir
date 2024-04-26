import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-g-trek-images',
  templateUrl: './g-trek-images.component.html',
  styleUrls: ['./g-trek-images.component.css']
})
export class GTrekImagesComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TreksService
  ) { }
  id!: string;
  files: any;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
    this.getPackage();
  }
  getPackage() {
    this.service.getTreksById(this.id).subscribe({
      next: (response) => {
        this.files = response.result.files;
      },
      error: (err) => { },
    });
  }
  deleteImage(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteFile(id).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              this.getPackage();
            } else {
              environment.Toast.fire({
                icon: 'error',
                timer: 500,
                title: 'There is some issue please try later.',
              });
            }
          },
        });
      }
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
            this.getPackage();
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
