import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IternaryService } from 'src/app/Services/iternary.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-g-list',
  templateUrl: './g-list.component.html',
  styleUrls: ['./g-list.component.css']
})
export class GListComponent {
  constructor(
    private service: IternaryService,
    private activatedRoute: ActivatedRoute,
    private san: DomSanitizer
  ) { }
  embedLink! : any;
  latitude! : any;
  longitude! : any;
  trekId!: string;
  iterneries: any;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void 
  {
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
          this.latitude = response.result[0].latitude;
          this.longitude = response.result[0].longitude;
          let safeEmbedLink = this.san.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=');
          let newEmbedLink = safeEmbedLink + this.latitude+','+this.longitude;
          this.embedLink = newEmbedLink;
          console.log(this.embedLink);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    // let safeEmbedLink = this.san.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=');
    // let newEmbedLink = safeEmbedLink + this.latitude+','+this.longitude;
    // this.embedLink = newEmbedLink;
    // console.log(this.embedLink);
    
  }
}
