import { Injectable } from '@angular/core';
import {Chart, LineController} from "chart.js/auto";
import {PieController} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  chart1: any
  chart2: any;
  createLineChart(chart: string, labels: string[], data: number[][]){
    Chart.register(LineController)
    this.chart1 = new Chart(chart, {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "Active users",
            data: data[0],
            backgroundColor: 'rgb(199,199,199)',
            borderColor: 'rgb(199,199,199)',
            tension: 0.2,
          },
          {
            label: "Created playlists",
            data: data[1],
            backgroundColor: 'rgb(239,12,12)',
            borderColor: 'rgb(227,27,27)',
            tension: 0.2
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }
  createPieChart(chart:string, labels: string[], data:number[], hex: string[]){
    Chart.register(PieController)
    this.chart2 = new Chart(chart, {
      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "Plays",
            data: data,
            backgroundColor: hex,
          }
        ]
      },
      options: {
       // indexAxis: 'y',
        aspectRatio:2.5,
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }
}
