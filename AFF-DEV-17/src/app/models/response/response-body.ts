export class ResponseBody<T> {
   success?: boolean;
   data?: T & T[];
   errorMsg?: any;
   errorCode?: number;
}
