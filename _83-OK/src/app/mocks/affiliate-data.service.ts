import { Injectable } from '@angular/core';
import { Affiliate } from '../models/affiliate';

@Injectable({providedIn: 'root'})
export class AffiliateDataService {

    mockAffiliateData(userAffiliate: Affiliate) {
        return userAffiliate.personalData = {
            nationality: 'ES',
            dni: 'C11111111D',
            address: 'calle vieja 500, 1ro 2da.',
            countryCode: 'ES',
            regionCode: '53',
            postalCode: '90001',
            phone: '444444',
            },
            userAffiliate.invoiceData = {
            companyType: 0,
            companyName: 'ACME INC.',
            cif: '0000001234',
            address: 'AV. nueva 100',
            countryCode: 'ES',
            regionCode: '07',
            postalCode: '91001',
            phone: '111111',
            iban: 'ES1234567890123456789012',
        };
    }

}
