import { Component } from '@angular/core';
import { TreksService } from 'src/app/Services/treks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trek-list',
  templateUrl: './trek-list.component.html',
  styleUrls: ['./trek-list.component.css'],
})
export class TrekListComponent {
  constructor(private service: TreksService) {}
  token: any;
  treks: any;
  baseUrl: string = environment.baseImagePath;
  ngOnInit(): void {
    this.token = sessionStorage['trek-kashmir-token'];
    this.service.treks().subscribe({
      next: (response) => {
        console.log(response);
        
        this.treks = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
