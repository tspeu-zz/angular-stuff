import { Injectable } from '@angular/core';
import { StatisticsAffiliate, AffiliateStatisticsItem } from '../models/statistics-affiliate';
import { Graph, ChartDataSets, ChartColors, ChartOptions, GraphResume } from '../models/graph';
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  resumeCard: StatisticsAffiliate;
  resumeCardItem: AffiliateStatisticsItem[];
  graphData: Graph;

  chartType: string;
  chartDataSets: ChartDataSets[];
  chartLabels: string[];
  chartColors: ChartColors[];
  chartOptions: ChartOptions;
  graphResume: AffiliateStatisticsItem[];

  constructor() { }


  /*getResumeCard(): StatisticsAffiliate {
    this.resumeCardItem = [
      { label: 'Número total de productos', value: '1598' },
      { label: 'Clicks', value: '8056' },
      { label: 'Conversion', value: '75.7%' },
      { label: 'Visualizaciones', value: '10157' },
      { label: 'Precio por conversión', value: '100€' }
    ];


    /!*this.resumeCard = {
      title: 'Informe de facturación',
      subtitle: 'Datos de venta',
      datePicker: ['0', '2'],
      items: this.resumeCardItem,
      total: '8.100€'
    };*!/

    return this.resumeCard;
  }*/

  /*getGraphCard(option) {

    switch (option) {
      case '1':
        this.chartType = 'line';

        this.chartDataSets = [
          { data: [1000], label: 'Clicks' },
          { data: [1500], label: 'Visualizaciones' }
        ];

        this.chartLabels = ['Enero'];

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

        this.chartOptions = {
          responsive: true
        };

        this.graphResume = [
          { label: 'Clicks:', value: '8056' },
          { label: 'Visualizaciones:', value: '10157' },
          { label: 'Total de ingresos:', value: '8100€' }
        ];

        break;
      /!*case '2':
        this.chartType = 'bar';

        this.chartDataSets = [
          { data: [1500, 3500, 4500, 8500, 9500, 10000, 10157], label: 'Visualizaciones' },
          { data: [65, 200, 473, 635, 801, 1123, 1598], label: 'Productos totales' },
          { data: [1000, 3000, 6000, 7000, 7500, 8000, 8056], label: 'Clicks' },
          { data: [13, 23, 35, 41, 59, 67, 75.7], label: 'Conversión' }
        ];

        this.chartLabels = ['Enero'];
        this.chartColors = [
          {
            backgroundColor: 'red',
            borderColor: 'rgba(10, 99, 132, .2)',
            borderWidth: 2,
          },
          {
            backgroundColor: 'blue',
            borderColor: 'rgba(0, 10, 130, .7)',
            borderWidth: 2,
          },
          {
            backgroundColor: 'green',
            borderColor: 'rgba(110, 99, 122, .2)',
            borderWidth: 2,
          },
          {
            backgroundColor: 'purple',
            borderColor: 'rgba(0, 10, 10, .7)',
            borderWidth: 2,
          }
        ];

        this.chartOptions = {
          responsive: true
        };

        this.summary = [
          { label: 'Conversión:', value: '75.7%' },
          { label: 'Número total de productos:', value: '1598' },
          { label: 'Total de ingresos:', value: '8100€' }
        ];

        break;*!/
    }

    this.graphData = {
      chartType: this.chartType,
      chartDataSets: this.chartDataSets,
      chartLabels: this.chartLabels,
      chartColors: this.chartColors,
      chartOptions: this.chartOptions,
      summary: this.graphResume,
    };

    return this.graphData;
  }*/

  getDropdownConfiguration() {
    return [
    { text: 'Visualizaciones y Clicks', key: '1' },
    { text: 'Total de resumen global', key: '2' },
  ];
  }
}
