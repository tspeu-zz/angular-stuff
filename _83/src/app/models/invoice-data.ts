export class InvoiceData {
   id?: number;
   creationDate?: Date;
   modificationDate?: Date;
   isDeleted?: boolean;
   companyType: number;
   companyName: string;
   cif: string;
   address: string;
   countryCode: string;
   regionCode: string;
   postalCode: string;
   phone: string;
   iban: string;
}
