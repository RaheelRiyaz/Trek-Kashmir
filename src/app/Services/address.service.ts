import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAddresses } from '../Models/AddressModels/get-addresses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  // Get all Addresses using Entity ID
  addressesByEntityId(id: string): Observable<GetAddresses> {
    return this.httpClient.get<GetAddresses>(`${environment.baseUrl}Address/all/${id}`);
  }
}
