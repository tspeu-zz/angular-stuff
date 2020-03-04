export class ResponseGeoApi<T> {
    success?: boolean;
    response?: T & T[];
    errors?: any;
    processeTime?: number;
}
