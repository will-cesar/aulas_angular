import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return ''; }
    return value.split(' ')[0];
  }

}