import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  a = [
    '',
    'uma',
    'duas',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
    'dez',
    'onze',
    'doze',
    'treze',
    'quatorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove '];


  transform(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])]) : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])]) : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])]) : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])]) : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
        (this.a[Number(n[5])]) + '' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}