import {Graph} from './graph';

export class StatisticsAffiliate {
    title: string;
    subtitle: string;
    dateRange: DateRange;
    items: AffiliateStatisticsItem[];
    amount: number;
    currencyCode: string;
    countryCode: string;
    currencySymbol: string;
    graph: Graph;
}

export class AffiliateStatisticsItem {
    label: string;
    value: string;
    key?: string;
}

export class DateRange {
  from: string;
  to: string;
}

export class SatDatePicker {
  begin: Date;
  end: Date;
}
