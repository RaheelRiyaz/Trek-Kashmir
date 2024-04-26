import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UpdateIternary } from 'src/app/Models/update-iternary';
import { IternaryService } from 'src/app/Services/iternary.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  constructor(
    private service: IternaryService,
    private activatedRoute: ActivatedRoute,
    private san: DomSanitizer
  ) {}
  updateIternary! : UpdateIternary;
  trekId!: string;
  iterneries: any;
  baseUrl: string = environment.baseImagePath;
  embedLink!: any;
  ngOnInit(): void {

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
          console.log(response.result[0]);
          this.updateIternary = response.result[0];
          console.log(this.updateIternary);
          
          // let safeEmbedLink = this.san.bypassSecurityTrustResourceUrl('https://www.google.com/maps?q=');
          // let newEmbedLink = safeEmbedLink + this.latitude+','+this.longitude;
          // this.embedLink = newEmbedLink;
        }
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
