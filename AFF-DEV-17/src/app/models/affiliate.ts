import {PersonalData} from './personal-data';
import {InvoiceData} from './invoice-data';

export class Affiliate {
   id: number;
   name: string;
   surname: string;
   email: string;
   code: string;
   password: string;
   active: boolean;
   emailConfirmed: boolean;
   confirmationToken: string;
   confirmationTokenExpiration: Date;
   comissionPercent: number;
   personalData: PersonalData;
   invoiceData: InvoiceData;
}
