import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(birthday: string): number {
    // @ts-ignore
    if (!birthday) {
      return 0;
    }
    const date = new Date(birthday);
    return new Date().getUTCFullYear() - date.getUTCFullYear();
  }

}
