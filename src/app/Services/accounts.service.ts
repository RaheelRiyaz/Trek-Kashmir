import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../Models/signup';
import { Observable } from 'rxjs';
import { Login } from '../Models/login';
import { ForgotPassword } from '../Models/forgotPassword';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../Models/changePassword';
import { UpdateModel } from '../Models/updateAccount';
import { AccountModel, EditAccount } from '../Models/account-model';
import { UserRole } from '../Enums/userRole';
import { ApiResponse } from '../Models/api-response';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private httpClient: HttpClient) {}
  signUp(model: Signup): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'accounts/signup',
      model
    );
  }
  login(model: Login): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'accounts/login',
      model
    );
  }
  forgotPassword(model: ForgotPassword): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'accounts/forgotpassword',
      model
    );
  }
  changePassword(model: ChangePassword): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'accounts/changepassword',
      model
    );
  }
  uploadPicture(data: FormData): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'accounts/uploadpic',
      data
    );
  }
  accountById(id: string=""): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      `${environment.baseUrl}Accounts/${id}`
    );
  }
  updateAccount(modal: UpdateModel): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(
      environment.baseUrl + 'accounts',
      modal
    );
  }
  getAddres() {
    return this.httpClient.get(environment.baseUrl + 'address');
  }

  getAccounts(userRole: Number): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(
      `${environment.baseUrl}Accounts/by-role?userRole=${userRole}`
    );
  }

  searchAccount(name: string, userRole: number): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(
      `${environment.baseUrl}Accounts/search/${name}?userRole=${userRole}`
    );
  }

  editAccount(model: any): Observable<AccountModel> {
    return this.httpClient.put<AccountModel>(
      `${environment.baseUrl}Accounts`,
      model
    );
  }

  getAccountsByUserRole(role: UserRole): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.baseUrl + 'accounts/by-role?userrole=' + role
    );
  }
}
