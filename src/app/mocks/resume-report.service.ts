import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeReportService {

  constructor() { }

  getResumeReport(parametros) {
    return atob('aHR0cHM6Ly9jZG4udGVjaHRpdHV0ZS5jb20vY3Vyc29zbWVkaWNpbmEvbWVkaWEvY3Vyc28vMjE1' +
    'L2Rvc3NpZXIvYWN0dWFsaXphY2lvbi1hbmVzdGVjaW9sb2dpYS1yZWFuaW1hY2lvbi10ZXJhcGV1dGljYS1kb2xvci0xLnBkZg==');
  }
}
