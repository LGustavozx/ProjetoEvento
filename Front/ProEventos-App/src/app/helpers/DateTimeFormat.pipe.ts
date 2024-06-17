import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constantes } from './../util/constantes';

@Pipe({
  name: 'DateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {

      const [date, time] = value.split(' ');
      const [day, month, year] = date.split('/');
      value = `${year}-${month}-${day}T${time}`;
    }
    return super.transform(value, Constantes.DATE_TIME_FMT || 'dd/MM/yyyy HH:mm a');
  }

}
