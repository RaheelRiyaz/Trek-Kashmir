import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(userRole: number): string {
    if (userRole == 1) return `Admin`;
    else if (userRole == 2) return `Client`;
    else if (userRole == 3) return `Guide`;
    else return `Not a user`;
  }

}
