import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom'
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: any, currencyCode?: string, countryCode?: string): string | null {
    return this.formatByCountry.get(countryCode.toLowerCase())
      .replace('sym', currencyCode)
      .replace('#', value);
  }

  get formatByCountry(): Map<string, string> {
    const countriesMap = new Map();
    countriesMap.set('ar', 'sym #');
    countriesMap.set('bo', 'sym#');
    countriesMap.set('br', 'sym#');
    countriesMap.set('cl', 'sym#');
    countriesMap.set('co', 'sym #');
    countriesMap.set('cr', 'sym#');
    countriesMap.set('cu', 'sym#');
    countriesMap.set('ec', 'sym#');
    countriesMap.set('sv', 'sym#');
    countriesMap.set('es', '#sym');
    countriesMap.set('us', 'sym#');
    countriesMap.set('gt', 'sym#');
    countriesMap.set('gq', 'sym #');
    countriesMap.set('hn', 'sym#');
    countriesMap.set('mx', 'sym#');
    countriesMap.set('ni', 'sym#');
    countriesMap.set('pa', 'sym#');
    countriesMap.set('py', 'sym #');
    countriesMap.set('pe', 'sym#');
    countriesMap.set('pt', '#sym');
    countriesMap.set('pr', 'sym#');
    countriesMap.set('do', 'sym#');
    countriesMap.set('uy', 'sym #');
    countriesMap.set('ve', 'sym#');

    return countriesMap;
  }
}
