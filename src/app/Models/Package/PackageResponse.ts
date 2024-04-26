export class PackageResponse
{
    id! : string;
    name! : string;
    description! : string;
    groupSize! : number;
    price! : number;
    startDate! : Date;
    endDate! : Date;
    guideId! : string;
    guideName! : string;
    guideContactNo! : string;
    packageBookingStatus! : number;
    files! : [];
    fileId! : null;
    filePath : string = "";
    createdOn! : Date;
    totalBooking! : number;
}

// "id": "8f6c0c7e-dcff-44e8-b04e-111ee7e10401",
//     "name": "PahalgamPackage",
//     "description": "pahalgam package",
//     "groupSize": 8,
//     "price": 12000,
//     "startDate": "2023-11-07T00:00:00+05:30",
//     "endDate": "2023-11-23T00:00:00+05:30",
//     "guideId": "60b8dd75-307f-4619-a3d1-7fea97edae30",
//     "guideName": "Javaid",
//     "guideContactNo": "8899765423",
//     "packageBookingStatus": 1,
//     "files": [],
//     "fileId": null,
//     "filePath": "",
//     "createdOn": "2023-10-31T00:00:00+05:30",
//     "totalBooking": 3