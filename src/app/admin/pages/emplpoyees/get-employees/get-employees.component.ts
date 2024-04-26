import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-get-employees',
  templateUrl: './get-employees.component.html',
  styleUrls: ['./get-employees.component.css']
})
export class GetEmployeesComponent {
  constructor(
    private accountService: AccountsService,
    private router: Router
  ) {

  }
  employees: any;
  table: boolean = false;
  myGender!: string;
  searchResponse!: any;
  message!: string;
  isAdminsTable!: boolean;
  isGuidesTable!: boolean;


  ngOnInit(): void {
    this.initialFun();
  }

  initialFun() {
    this.isAdminsTable = true;
    this.isGuidesTable = false;
    this.message = ``;
    this.accountService.getAccounts(1).subscribe(
      response => {
        console.log(response);
        this.message = ``;
        this.table = true;
        this.searchResponse = null;
        this.employees = response.result;
      },
      error => {
        this.message = ``;
        console.log(error);
        console.log("can't retrieve clients");
      }
    );
  }

  // Get Admins 

  getAdmins() {
    this.initialFun();
  }

  // Get Guides
  getGuides() {
    this.isAdminsTable = false;
    this.isGuidesTable = true;
    this.message = ``;
    this.accountService.getAccounts(3).subscribe(
      response => {
        console.log(response);
        this.message = ``;
        this.table = true;
        this.searchResponse = null;
        this.employees = response.result;
      },
      error => {
        this.message = ``;
        console.log(error);
        console.log("can't retrieve clients");
      }
    );
  }



  searchAdmin(event: any) {
    if (event.target.value.length > 0) {
      this.accountService.searchAccount(event.target.value, 1).subscribe(
        response => {
          console.log(response);
          this.employees = response.result;
          if (response.message == "No Account Found") {
            this.employees = [];
            this.table = false;
            this.message = `${response.message}`;
          }
          else {
            this.message = ``;
          }
        },
        error => {
          this.message = ``;
          console.log(error);
          console.log("Can't search");
        }
      );
    }
    else {
      this.initialFun();
    }
  }


  searchGuide(event: any) {
    if (event.target.value.length > 0) {
      this.accountService.searchAccount(event.target.value, 3).subscribe(
        response => {
          console.log(response);
          this.employees = response.result;
          if (response.message == "No Account Found") {
            this.employees = [];
            this.table = false;
            this.message = `${response.message}`;
          }
          else {
            this.message = ``;
          }
        },
        error => {
          this.message = ``;
          console.log(error);
          console.log("Can't search");
        }
      );
    }
    else {
      this.initialFun();
    }
  }


}
