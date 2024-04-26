import { Component, OnInit } from '@angular/core';
import { HotelsResponse } from 'src/app/Models/hotels';
import { HotelService } from 'src/app/service/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelsComponent implements OnInit {
hotels!:HotelsResponse[];
  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe(response=>{
      if (response.isSuccess){
        this.hotels=response.result;
      }
    })
  }

}
