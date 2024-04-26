import { Component, OnInit } from '@angular/core';
import { PackagesResponse } from 'src/app/Models/packages-request';
import { PackageService } from 'src/app/Services/package.service';
// import { PackageService } from 'src/app/service/package.service';

@Component({
  selector: 'app-packages-details',
  templateUrl: './packages-details.component.html',
  styleUrls: ['./packages-details.component.css']
})
export class PackagesDetailsComponent implements OnInit {
  packages!:PackagesResponse[];
  constructor(private services:PackageService) { }

  ngOnInit(): void {
    this.services.getpackages().subscribe(Response=>{
      this.packages=Response.result;
      console.log(Response.result)
    })
  }

}
