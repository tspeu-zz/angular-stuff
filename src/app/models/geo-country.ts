import { Region } from './region';

export class GeoCountry {
  id?: string;
  creationDate?: Date;
  modificationDate?: Date;
  isDeleted?: boolean;
  isoCode?: string;
  geoNameId: number;
  name: string;
  continentId: number;
  preferredFeatureCode: string;
  postalCodeRegex: string;
  postalCodeFormat: string;
  phone: string;
  currencyName: string;
  demonym: string;
  currencyCode: string;
  fipsCode: string;
  tld: string;
  isoNumericCode: number;
  defaultLanguageId: number;
  regions: Region[];
}




