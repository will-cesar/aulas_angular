import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filterlist'
  })
  export class FilterlistPipe implements PipeTransform {
  
    transform(value: any, args?: any): any {
      if(!args)
       return value;
      return value.filter(
        item => item.class.toLowerCase().indexOf(args.toLowerCase()) > -1
     );
    }
  }