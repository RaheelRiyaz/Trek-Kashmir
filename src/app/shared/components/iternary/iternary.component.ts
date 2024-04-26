import { Component, Input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IternaryService } from 'src/app/Services/iternary.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iternary',
  templateUrl: './iternary.component.html',
  styleUrls: ['./iternary.component.css']
})
export class IternaryComponent {
  constructor(
    private service: IternaryService,
    private activatedRoute: ActivatedRoute
  ) {}
  // map
  // @Input({ required: true }) embedLink: string = 'https://maps.app.goo.gl/ugUftoAiKYB8szLp9';
  // domSanitizer = inject(DomSanitizer);
  //map
  embedLink! : string;
  trekId!: string;
  iterneries: any;
  token:any;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    // this.embedLink = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1702829.7498542645!2d75.26496015!3d33.5315621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1698944363500!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    this.token = environment.getToken();
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.trekId = response['id'];
      },
    });
    this.service.getIternaryByTrekId(this.trekId).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response.isSuccess) {
          this.iterneries = response.result;
        }
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
