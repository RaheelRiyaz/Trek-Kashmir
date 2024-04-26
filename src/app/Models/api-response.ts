import { HttpStatusCode } from "@angular/common/http";

export class ApiResponse<T>{
    isSuccess!:boolean;
    message!:string;
    result!:T;
    statusCode!:HttpStatusCode;
}
