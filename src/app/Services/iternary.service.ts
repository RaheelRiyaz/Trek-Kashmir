import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root',
})
export class IternaryService {
  constructor(private httpClient: HttpClient) {}
  getIternaryByTrekId(id: string): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>> (
      'http://localhost:5118/api/DayItenary/trek/' + id
    );
  }
  postItenary(model: FormData): Observable<ApiResponse<any>>{
    return this.httpClient.post<ApiResponse<any>> (environment.baseUrl + 'dayitenary', model);
  }

  putIternary(model: any): Observable<ApiResponse<any>>
  {
    return this.httpClient.put<ApiResponse<any>>(environment.baseUrl + 'DayItenary', model)
  } 
}
