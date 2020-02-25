export class Graph {
    chartType: string;
    chartDataSets: ChartDataSets[];
    chartLabels: string[];
    chartColors: ChartColors[];
    chartOptions: ChartOptions;
    graphResume: GraphResume[];
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
    text: string;
    value: string;
}
