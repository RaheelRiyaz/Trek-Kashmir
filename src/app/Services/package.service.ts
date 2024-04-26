import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppOrderResponse } from '../Models/appOrderResponse';
import { ApiResponse } from '../Models/api-response';
import { UpdateBookingStatus } from '../Models/updateBookingStatus';
import { UpdateModel } from '../Models/updateAccount';
import { UpdatePackage } from '../Models/Package/updatePackage';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private httpclient: HttpClient) { }

  getpackages(): Observable<ApiResponse<any>> {
    return this.httpclient.get<ApiResponse<any>>(environment.baseUrl + 'packages');
  }

  getGuidePackages(): Observable<ApiResponse<any>> {
    return this.httpclient.get<ApiResponse<any>>(environment.baseUrl + 'packages/guidepackages');
  }

  get nativeWindow(): any {
    return _window();
  }

  getpackageByid(id: string): Observable<ApiResponse<any>> {
    return this.httpclient.get<ApiResponse<any>>(environment.baseUrl + 'packages/' + id);
  }
  searchPackage(term: string): Observable<any> {
    return this.httpclient.get(environment.baseUrl + 'packages/search/' + term);
  }
  addPackage(packageModel: FormData): Observable<ApiResponse<any>> {
    return this.httpclient.post<ApiResponse<any>>(environment.baseUrl + 'packages', packageModel);
  }
  bookPackage(id: string): Observable<ApiResponse<AppOrderResponse>> {
    let pack = {
      packageId: id,
    };
    return this.httpclient.post<ApiResponse<AppOrderResponse>>(
      environment.baseUrl + 'Bookings/CreateOrder',
      pack
    );
  }

  CapturePaymentDetails(paymentOptions: any): Observable<ApiResponse<any>> {
    return this.httpclient.post<ApiResponse<any>>(
      environment.baseUrl + 'Bookings/CapturePaymentDetails',
      paymentOptions
    );
  }

  updatepackageBookingStatus(
    pack: UpdateBookingStatus
  ): Observable<ApiResponse<any>> {
    return this.httpclient.put<ApiResponse<any>>(
      environment.baseUrl + 'Packages/change-package-bookingstatus',
      pack
    );
  }
  updatePackage(model: UpdatePackage): Observable<ApiResponse<any>> {
    return this.httpclient.put<ApiResponse<any>>(environment.baseUrl + 'packages', model);
  }
  deleteFile(id: string): Observable<any> {
    return this.httpclient.delete<ApiResponse<any>>(
      environment.baseUrl + 'packages/delete-file/' + id
    );
  }
  postFile(model: FormData): Observable<any> {
    return this.httpclient.post<ApiResponse<any>>(
      environment.baseUrl + 'packages/upload-files/',
      model
    );
  }
}
