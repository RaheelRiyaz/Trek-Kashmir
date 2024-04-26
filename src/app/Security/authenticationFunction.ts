import { UserRole } from '../Enums/userRole';

export function IsUserAuthenticated(role: UserRole): boolean {
  const sessionObj = sessionStorage['trek-kashmir-token']?JSON.parse(sessionStorage['trek-kashmir-token']):'';
  if (sessionObj && sessionObj.userRole === role) {
    return true;
  } else return false;
}
