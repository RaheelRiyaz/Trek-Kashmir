import { UserRole } from "../Enums/userRole";

export class AdminRequest {
    userName!:string;
    name!:string;
    email!:string;
    userRole:number=UserRole.Admin;
    password!:string;
    confirmPassword!:string
}

export class AdminResponse{
    userName!:string;
    name!:string;
    email!:string;
    userRole:number=UserRole.Admin;
}
