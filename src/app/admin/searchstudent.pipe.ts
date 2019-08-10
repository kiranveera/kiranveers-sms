import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchstudent'
})
export class SearchstudentPipe implements PipeTransform {

  transform(data: any[], searchterm: any): any {
    if (!searchterm) {
      return data;

    }
    else {
      return data.filter(data => data.rollnumber.toLowerCase().indexOf(searchterm.toLowerCase()) !== -1)
    }


  }

}
