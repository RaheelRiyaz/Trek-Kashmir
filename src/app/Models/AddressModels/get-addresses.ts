export class GetAddresses {
    constructor(
        public isSuccess?: boolean,
        public statusCode?: Number,
        public message?: string,
        public result?: [
            {
                id?: string,
                entityId?: string,
                module?: Number,
                state?: string,
                city?: string,
                landmark?: string,
                pincode?: Number,
                addressLine?: string,
            }
        ]
    ) { }
}
// {
//     "isSuccess": true,
//     "statusCode": 200,
//     "message": "success",
//     "result": [
//       {
//         "id": "af9b00e3-213d-49f2-8932-08dbba66995c",
//         "entityId": "2d201a2e-88e0-4415-b3f0-53e13fdbab87",
//         "module": 3,
//         "state": "J&K",
//         "city": "Srinagar",
//         "landmark": "Jamia Masjid Barzulla Sgr",
//         "pincode": 190005,
//         "addressLine": "Old Barzulla Srinagar"
//       },