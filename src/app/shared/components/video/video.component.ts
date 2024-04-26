import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  videoUrl: string = environment.baseImagePath + 'Files/';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.videoUrl += response['url'];
      },
    });
    console.log(this.videoUrl);
  }
}
