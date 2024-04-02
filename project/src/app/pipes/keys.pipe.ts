import { Pipe, PipeTransform } from '@angular/core';
import { keys } from '../keys/keys';


@Pipe({
  name: 'keys',
  standalone: true
})
export class KeysPipe implements PipeTransform {

  transform(clave: string): string {
    return keys[clave] || '';
  }
}
