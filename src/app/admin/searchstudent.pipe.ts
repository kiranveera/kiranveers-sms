import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchstudent'
})
export class SearchstudentPipe implements PipeTransform {

  transform(data: any[], search: any): any {
    if (!search) {
      return data;

    }
    else {
      return data.filter(data => data.rollnumber.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }


  }

}
