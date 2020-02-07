import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classSpecifications'
})
export class ClassSpecificationsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return ''; }
    return value.split(' ').slice(1).join(' ');
  }

}   