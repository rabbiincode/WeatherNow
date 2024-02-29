import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})

export class ChartComponent {
  @Input() chartData: any
  @Input() chartType: any
  chart: any = []
  randomColors: any[] = []

  ngOnInit() {
    this.loadChart()
  }

  loadChart = () => {
    // Generate random colors for each dataset
    this.randomColors = this.generateRandomColors(this.chartData.length)
    let chartStatus = Chart.getChart("canvas")
    if (chartStatus != undefined){
      chartStatus.destroy()
    }

    this.chart = new Chart('canvas', {
      type: this.chartType,
      data: {
        labels: this.chartData.map((data: { name: string }) => data.name),
        datasets: [
          {
            label: 'Temperature in Fahrenheit',
            data: this.chartData.map((data: { temperature: number }) => data.temperature),
            backgroundColor: this.randomColors,
            borderColor: this.randomColors,
            borderWidth: 1,
          },
          {
            label: 'Detailed Forecast - see below',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  generateRandomColors(count: number): string[] {
    const colors = []
    for (let i = 0; i < count; i++) {
      // Generate random RGBA values
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      const alpha = 1 // You can adjust transparency if needed
      const color = `rgba(${r}, ${g}, ${b}, ${alpha})`
      colors.push(color)
    }
    return colors
  }
}
