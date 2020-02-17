import { Injectable } from '@angular/core';
import { ResumeCard, ResumecardItem } from '../models/resumeCard';
import { Graph, ChartDataSets, ChartColors, ChartOptions, GraphResume } from '../models/graph';
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  resumeCard: ResumeCard;
  resumeCardItem: ResumecardItem[];
  graphData: Graph;

  chartType: string;
  chartDataSets: ChartDataSets[];
  chartLabels: string[];
  chartColors: ChartColors[];
  chartOptions: ChartOptions;
  graphResume: GraphResume[];
  dropdownOptions: string[];

  constructor() { }


  getResumeCard(): ResumeCard {
    this.resumeCardItem =
      [{ text: 'Número total de productos', value: '100€' },
      { text: 'Clicks', value: '100€' },
      { text: 'Conversion', value: '100€' },
      { text: 'Interacciones totales', value: '100€' },
      { text: 'Precio por conversión', value: '100€' }];


    this.resumeCard = {
      title: 'Informe de facturación',
      subtitle: 'Datos de venta',
      datePicker: ['0', '2'],
      items: this.resumeCardItem,
      total: '8.100€'
    };

    return this.resumeCard;
  }

  getGraphCard() {
    this.chartType = 'line';

    this.chartDataSets = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
    ];

    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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
      { text: 'Visitas:', value: '122' },
      { text: 'Ventas:', value: '233' },
      { text: 'Total de ingresos:', value: '344€' }
    ];
    this.dropdownOptions = ['Resumen de beneficio', 'Resumen de beneficio', 'Resumen de beneficio'];
    this.graphData = {
      chartType: this.chartType,
      chartDataSets: this.chartDataSets,
      chartLabels: this.chartLabels,
      chartColors: this.chartColors,
      chartOptions: this.chartOptions,
      graphResume: this.graphResume,
      dropdownOptions: this.dropdownOptions
    };

    return this.graphData;
  }

}
