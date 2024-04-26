import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel, EditAccount } from 'src/app/Models/account-model';
import { AccountsService } from 'src/app/Services/accounts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountsService
  ) {

  }
  id!: string;
  clientModel!: any;
  editClientModel!: EditAccount;
  ngOnInit(): void {

    // Getting ID
    this.activatedRoute.params.subscribe(
      response => {
        console.log(response);
        this.id = response['id'];
        console.log(this.id);
      },
      error => {
        console.log(error);
        console.log("Can't retrieve id");
      }
    );

    // Getting Model using ID

    this.accountService.accountById(this.id).subscribe(
      response => {
        console.log(response);
        this.clientModel = response;
      }
    );
  }

  // Editing Client
  editClient(model: any) {
    console.log(model);
    // Moving on to edit the account
    this.accountService.editAccount(model).subscribe(
      response => {
        console.log(response);
        console.log(`Edited client successfully`);
        if (response.isSuccess) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Client edited successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          if (this.clientModel.result.userRole == 1) {
            this.router.navigate(['/admin/clients']);
          }
          else {
            this.router.navigate(['/admin/employees'])
          }

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Can't edit client.. Some error occured",
            showConfirmButton: false,
            timer: 1500,
          });
          if (this.clientModel.result.userRole == 1) {
            this.router.navigate(['/admin/clients']);
          }
          else {
            this.router.navigate(['/admin/employees'])
          }
        }
      },
      error => {
        console.log(error);
        console.log(`Can't update the client`);

      }
    );
  }
}
