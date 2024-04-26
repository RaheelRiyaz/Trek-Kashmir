import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAddresses } from 'src/app/Models/AddressModels/get-addresses';
import { Account } from 'src/app/Models/account-model';
import { AccountsService } from 'src/app/Services/accounts.service';
import { AddressService } from 'src/app/Services/address.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountsService: AccountsService,
    private addressService: AddressService
  ) {}
  model!: Account;
  id!: string;
  baseUrl: string = environment.baseImagePath;
  myUserRole!: string;
  gender!: string;
  address!: GetAddresses;
  imageToggle: string = 'none';
  fileUrl:string = environment.baseImagePath;

  ngOnInit(): void {
    // Getting ID
    this.activatedRoute.params.subscribe(
      (response) => {
        this.id = response['id'];
      },
      (error) => {
        console.log("Can't retrieve ID");
      }
    );

    // Getting details Model using ID

    this.accountsService.accountById(this.id).subscribe(
      (response) => {
        this.model = response.result;
        // UserRole Conversion
        if (this.model.userRole == 1) {
          this.myUserRole = `Admin`;
        } else if (this.model.userRole == 2) {
          this.myUserRole = `Client`;
        } else if (this.model.userRole == 3) {
          this.myUserRole = `Guide`;
        }

        // Gender Output Conversion
        if (this.model.gender == 1) {
          this.gender = `Male`;
        } else if (this.model.gender == 0) {
          this.gender = `Female`;
        }
        console.log(this.model);
      },
      (error) => {
        console.log("Can't retrieve details model");
      }
    );

    // Getting Address
    this.addressService.addressesByEntityId(this.id).subscribe((response) => {
      console.log(response);
      this.address = response;
      console.log('Here is your address');
      console.log(this.address);
    });
  }
  blurImage(container: any, e: any) {
    if (e.target.id === 'img') {
      if (!container.classList.contains('blur')) {
        this.imageToggle = 'block';
        container.classList.add('blur');
      } else {
        this.imageToggle = 'none';
        container.classList.remove('blur');
      }
    }
  }
  removeBlur(container: any, e: any) {
    if (e.target.id !== 'img') {
      this.imageToggle = 'none';
      container.classList.remove('blur');
    }
  }
}
