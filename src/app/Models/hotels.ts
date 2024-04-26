export class HotelsRequest {
    // HotelName!: string;
    // HotelAddress!: string;
    // Star!: number;
    // Description!: string;
    // Files!: string;

    hotelname: any;
    hoteladdress: any;
    star: any;
    description: any;
    files: any;
}
export class HotelsResponse {
    id!: string;
    hotelName!: string;
    star!: number;
    imagePath!: string;
    description!: string;

}
export class HotelsUpdate {
    id!: string;
    hotelName!: string;
    star!: number;
    description!: string;
    imagePath!: string;
}