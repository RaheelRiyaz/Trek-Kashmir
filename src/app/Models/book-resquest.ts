export class BookRequest {
  name!: string;
  email!:string
  phoneNumber!: string;
  noOfAdults!: number;
  noOfChildrens!: number
  packageId!:string
}

export class BookResponse{
    name!: string;
    email!: string
    phoneNumber!:string
    noOfAdults!: number;
    noOfChildrens!: number;
    packageId!: string;
    id!:string;
}
