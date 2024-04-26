export class AccountModel {
    constructor(
        public isSuccess?: boolean,
        public statusCode?: Number,
        public message?: string,
        public result?: [
            id?: string,
            userName?: string,
            name?: string,
            gender?: number,
            email?: string,
            contactNo?: string,
            userRole?: Number,
            filePath?: string,
            status?: Number,
            createdOn?: string
        ]
    ) {

    }
}

export class Account {
    public id?: string;
    public userName?: string;
    public name?: string;
    public gender?: number;
    public email?: string;
    public contactNo?: string;
    public userRole?: Number;
    public filePath?: string;
    public status?: Number;
    public createdOn?: string
}

export class EditAccount {
    constructor(
        public name?: string,
        public email?: string,
        public contactNo?: string,
        public gender?: Number
    ) {

    }
}


// {
//     "name": "string",
//     "email": "string",
//     "contactNo": "string",
//     "gender": 1
//   }

// {
//     "isSuccess": true,
//     "statusCode": 200,
//     "message": "Success",
//     "result": [
//       {
//         "id": "d75eaa02-8a0b-4a54-ad57-1712c25e524f",
//         "userName": "kamil",
//         "name": "kamil",
//         "gender": 0,
//         "email": "shahidfirdous.268+76@gmail.com",
//         "contactNo": "5008765412",
//         "userRole": 2,
//         "filePath": "Files/dp.png",
//         "status": 1,
//         "createdOn": "2023-09-18T00:00:00+05:30"
//       },
//     ]
// }

