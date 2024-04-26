import { UserRole } from "../Enums/userRole";

export class UserRequest {
    userName!:string;
    name!:string;
    email!:string;
    userRole:number=UserRole.Client;
    password!:string;
    confirmPassword!:string
  
}



export class UserResponse {
    userName!:string;
    name!:string;
    email!:string;
    userRole:number=UserRole.Client;
 
}
