import { Injectable } from '@angular/core';
import { Link } from '../models/link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  linksList: Link[];

  constructor() { }

  getLinks(): Link[] {

    this.linksList = [
       { text: 'Inicio', active: 1, disable: 0, url: '/dashboard' },
       { text: 'Cursos', active: 1, disable: 0, url: '/banner' },
       { text: 'Términos y condiciones', active: 1, disable: 0, url: '/terminos' }];
    return this.linksList;

  }
}
