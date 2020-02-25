import { Injectable } from '@angular/core';
import { ResumeCard, ResumecardItem } from '../models/resume-card';
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

  getGraphCard(option) {

    switch (option) {
      case '1':
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

        break;
      case '2':
        this.chartType = 'bar';

        this.chartDataSets = [
          { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
          { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
        ];

        this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.chartColors = [
          {
            backgroundColor: 'rgba(205, 10, 22, .12)',
            borderColor: 'rgba(10, 99, 132, .2)',
            borderWidth: 2,
          },
          {
            backgroundColor: 'rgba(10, 137, 132, .2)',
            borderColor: 'rgba(0, 10, 130, .7)',
            borderWidth: 2,
          }
        ];

        this.chartOptions = {
          responsive: true
        };

        this.graphResume = [
          { text: 'Visualizaciones:', value: '450' },
          { text: 'Ingresos:', value: '350' },
          { text: 'Pickaxe:', value: '9000' }
        ];

        break;
      case '3':
        this.chartType = 'horizontalBar';

        this.chartDataSets = [
          { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
          { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
        ];

        this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

        this.chartColors = [
          {
            backgroundColor: 'rgba(12, 10, 122, .12)',
            borderColor: 'rgba(10, 99, 1132, .2)',
            borderWidth: 2,
          },
          {
            backgroundColor: 'rgba(10, 112, 13, .2)',
            borderColor: 'rgba(0, 2, 120, .7)',
            borderWidth: 2,
          }
        ];

        this.chartOptions = {
          responsive: true
        };

        this.graphResume = [
          { text: 'Clicks:', value: '780' },
          { text: 'Llamadas:', value: '733' },
          { text: 'Links:', value: '969' }
        ];

        break;
    }

    this.graphData = {
      chartType: this.chartType,
      chartDataSets: this.chartDataSets,
      chartLabels: this.chartLabels,
      chartColors: this.chartColors,
      chartOptions: this.chartOptions,
      graphResume: this.graphResume,
    };

    return this.graphData;
  }

  getDropdownConfiguration() {
    return [
    { text: 'Gráfica 1', key: '1' },
    { text: 'Gráfica 2', key: '2' },
    { text: 'Gráfica 3', key: '3' }];
  }
}
