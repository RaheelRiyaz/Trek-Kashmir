import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateTrek } from '../Models/TrekModels/updateTrek';

@Injectable({
  providedIn: 'root',
})
export class TreksService {
  constructor(private httpClient: HttpClient) {}
  treks(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'trek');
  }
  deleteTrek(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'trek/delete/' + id);
  }
  getTreksByPackageId(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'trek/package/' + id);
  }
  getTreksById(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'trek/' + id);
  }
  updateTrek(model: UpdateTrek): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'trek/update', model);
  }
  addTrek(model: FormData): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'trek', model);
  }
  postFile(model: FormData): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'trek/upload-files',
      model
    );
  }
  deleteFile(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + 'trek/delete-file/' + id
    );
  }
}
