import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import { BookingResponse } from '../Models/BookingsModel/BookingResponse';
import { PackageBookingResponse } from '../Models/BookingsModel/PackageBookingResponse';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private httpClient: HttpClient) {}
  getBookingBypackageId(id: string): Observable<ApiResponse<PackageBookingResponse[]>> {
    return this.httpClient.get<ApiResponse<PackageBookingResponse[]>>(
      environment.baseUrl + 'bookings/' + id
    );
  }

  getMyBookings(): Observable<ApiResponse<BookingResponse[]>> {
    return this.httpClient.get<ApiResponse<BookingResponse[]>>(environment.baseUrl + 'bookings/mybookings');
  }

}
