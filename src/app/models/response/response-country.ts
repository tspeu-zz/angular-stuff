export class ResponseCountry<T> {
    success?: boolean;
    response?: T & T[];
    errors?: any;
    processeTime?: number;
}
