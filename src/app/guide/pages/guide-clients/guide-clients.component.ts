import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-guide-clients',
  templateUrl: './guide-clients.component.html',
  styleUrls: ['./guide-clients.component.css']
})
export class GuideClientsComponent {
  constructor(
    private accountService: AccountsService,
    private router: Router
  ) {

  }
  clients: any;
  table: boolean = false;
  myGender!: string;
  searchResponse!: any;
  message!: string;
  ngOnInit(): void {
    this.initialFun();
  }

  initialFun() {
    this.message = ``;
    this.accountService.getAccounts(2).subscribe(
      response => {
        console.log(response);
        this.message = ``;
        this.table = true;
        this.searchResponse = null;
        this.clients = response.result;
      },
      error => {
        this.message = ``;
        console.log(error);
        console.log("can't retrieve clients");
      }
    );
  }

  searchClient(event: any) {
    if (event.target.value.length > 0) {
      this.accountService.searchAccount(event.target.value, 2).subscribe(
        response => {
          console.log(response);
          this.clients = response.result;
          if (response.message == "No Account Found") {
            this.clients = [];
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
