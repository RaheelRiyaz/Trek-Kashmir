export class PackagesRequest {
  name!:string;
  startingPrice!: string;
  startingFrom!: string
  endingOn!: string
  description!:string;
  guideId!:string;
  path!:string[];
}
export class PackagesResponse{
    id!: string
    name!: string;
    startingPrice!: string;
    startingFrom!: string;
    endingOn!: string;
    description!:string;
    guideId!:string;
    path!:string[];
}
