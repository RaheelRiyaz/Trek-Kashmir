import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateGear } from '../Models/TrekingGears/updategear';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root',
})
export class TrekinggearsService {
  constructor(private httpClient: HttpClient) {}
  getTrekingGears(): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears'
    );
  }
  getTrekingGearsById(id: string): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears/' + id
    );
  }
  updategear(model: UpdateGear): Observable<ApiResponse<any>> {
    return this.httpClient.put<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears',
      model
    );
  }
  addTrekingGear(model: FormData): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears',
      model
    );
  }
  postFile(model: FormData): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears/upload-files',
      model
    );
  }
  searchTrek(term: string): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears/search/' + term
    );
  }
  deleteGear(id: string): Observable<ApiResponse<ApiResponse<any>>> {
    return this.httpClient.delete<ApiResponse<any>>(
      environment.baseUrl + 'trekkinggears/delete/' + id
    );
  }
}
