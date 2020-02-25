import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  copyTextToClickBoard(text: string) {
     const selBox = document.createElement('textarea');
     selBox.style.position = 'fixed';
     selBox.style.left = '0';
     selBox.style.top = '0';
     selBox.style.opacity = '0';
     selBox.value = text;
     document.body.appendChild(selBox);
     selBox.focus();
     selBox.select();
     document.execCommand('copy');
     document.body.removeChild(selBox);
  }
}
