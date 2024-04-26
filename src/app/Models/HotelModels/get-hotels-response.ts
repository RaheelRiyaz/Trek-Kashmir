export class GetHotelsResponse {
    constructor(
        public isSuccess?: boolean,
        public statusCode?: Number,
        public message?: string,
        public result?: [
            {
                id?: string,
                name?: string,
                star?: Number,
                description?: string,
                addressId?: string,
                state?: string,
                city?: string,
                landmark?: string,
                pincode?: Number,
                addressLine?: string,
                filePath?: string,
                isVideo?: boolean,
                createdOn?: string
            }
        ]
    ) { }
}

export class hotels {
    constructor(
        public id?: string,
        public name?: string,
        public star?: Number,
        public description?: string,
        public addressId?: string,
        public state?: string,
        public city?: string,
        public landmark?: string,
        public pincode?: Number,
        public addressLine?: string,
        public filePath?: string,
        public isVideo?: boolean,
        public createdOn?: string
    ) {

    }
}


// {
//     "isSuccess": false,
//     "statusCode": 404,
//     "message": "No Hotel Found",
//     "result":
//   }


// "id": "7923cf86-bea0-46ac-ae31-1ed9c18fca07",
//       "name": "Shehanshah Hotel",
//       "star": 3,
//       "description": "One of the most famous hotels in Srinagar, Kashmir",
//       "addressId": null,
//       "state": "",
//       "city": "",
//       "landmark": "",
//       "pincode": 0,
//       "addressLine": "",
//       "filePath": null,
//       "isVideo": false,
//       "createdOn": "2023-09-02T00:00:00+05:30"