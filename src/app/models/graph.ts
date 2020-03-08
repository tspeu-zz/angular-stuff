import {AffiliateStatisticsItem} from './statistics-affiliate';

export class Graph {
    title: string;
    chartType: string;
    chartDataSets: ChartDataSets[];
    chartLabels: string[];
    chartColors: ChartColors[];
    chartOptions: ChartOptions;
    summary: AffiliateStatisticsItem[];

    constructor() {
      this.chartColors = [
        {
          backgroundColor: 'rgba(105, 0, 132, .2)',
          borderColor: 'rgba(200, 99, 132, .7)',
          borderWidth: 2,
        },
        {
          backgroundColor: 'rgba(0, 137, 132, .2)',
          borderColor: 'rgba(0, 10, 130, .7)',
          borderWidth: 2,
        }
      ];
      this.chartOptions = { responsive: true };
    }
}

export class ChartDataSets {
    data: number[];
    label: string;
}

export class ChartColors {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
}

export class ChartOptions {
    responsive: boolean;
}

export class GraphResume {
    label: string;
    value: string;
}
