import { Component, OnInit } from '@angular/core';
import { IternaryService } from 'src/app/Services/iternary.service';

@Component({
  selector: 'app-update-iternary',
  templateUrl: './update-iternary.component.html',
  styleUrls: ['./update-iternary.component.css']
})
export class UpdateIternaryComponent implements OnInit
{
  constructor(private service: IternaryService){}
  ngOnInit(): void 
  {
    this.service.putIternary({}).subscribe({
      next: (res) => 
      {
        console.log(res);
      },
      
      error: (err) => 
      {
        console.log(err);
      }
    });
  }

}
