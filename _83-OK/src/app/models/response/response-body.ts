export class ResponseBody<T> {
   success?: boolean;
   data?: T;
   errorMsg?: any;
   errorCode?: number;
}
