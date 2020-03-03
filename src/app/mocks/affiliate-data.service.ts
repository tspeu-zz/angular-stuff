import { Injectable } from '@angular/core';
import { Affiliate } from '../models/affiliate';

@Injectable({providedIn: 'root'})
export class AffiliateDataService {

    mockAffiliateData(userAffiliate: Affiliate) {
        return userAffiliate.personalData = {
            nationality: 'ES',
            dni: 'C00000001D',
            address: 'calle principal 50, 1ro. 2da.',
            countryCode: 'ES',
            regionCode: '53',
            postalCode: '38001',
            phone: '922001001',
            },
            userAffiliate.invoiceData = {
            companyType: 0,
            companyName: 'ACME INC.',
            cif: 'A00000123B',
            address: 'avenida nueva 100',
            countryCode: 'ES',
            regionCode: '29',
            postalCode: '28012',
            phone: '917741001',
            iban: 'ES1234567890123456789012',
        };
    }

}
