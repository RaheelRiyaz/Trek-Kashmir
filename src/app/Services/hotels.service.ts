import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PutHotel } from '../Models/HotelModels/put-hotel';
import { GetHotelsResponse } from '../Models/HotelModels/get-hotels-response';
import { DeleteHotelResponse } from '../Models/HotelModels/delete-hotel-response';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = `${environment.baseUrl}Hotels`;

  // https://localhost:7036/api/
  getHotels(): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(`${this.baseUrl}`);
  }

  putHotel(putHotel: PutHotel): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(`${this.baseUrl}`, putHotel);
  }

  postHotel(postHotel: FormData): Observable<GetHotelsResponse> {
    return this.httpClient.post<GetHotelsResponse>(
      `${this.baseUrl}`,
      postHotel
    );
  }

  getById(id: string): Observable<GetHotelsResponse> {
    return this.httpClient.get<GetHotelsResponse>(`${this.baseUrl}/${id}`);
  }

  deleteHotel(id: string): Observable<DeleteHotelResponse> {
    return this.httpClient.delete<DeleteHotelResponse>(
      `${this.baseUrl}/DeleteHotel/${id}`
    );
  }
  searchHotel(term: string): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(environment.baseUrl + 'hotels/search/' + term);
  }
}
