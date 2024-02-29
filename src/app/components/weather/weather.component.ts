import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../chart/chart.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ChartComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterLink],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  location!: any
  chartData!: any[]
  chartBar = 'bar'
  chartLine = 'line'
  chartType = 'line'
  allData!: any
  detail!: any

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location = params.get('location')
      this.getForecast()
    })
  }

  getForecast = (): void => {
    this.weatherService.getForecast(this.location)
      .subscribe((data: any) => {
        this.allData = data.properties.periods
        let period = data?.properties?.periods.filter((period: any) => period.number == 1)
        period?.map((data: any) => this.detail = data)
        this.chartData = data.properties.periods.map((period: { name: string; temperature: number; detailedForecast: string }) => ({
          name: period.name,
          temperature: period.temperature
        }))
      })
  }

  changeChart = () => this.chartType = this.chartType === 'line' ? 'bar' : 'line'

  viewDetails = (event: any) => {
    let period = this.allData?.filter((period: any) => period.number == event.target.value)
    period?.map((data: any) => this.detail = data)
  }

  getDirection = (direction: string) => {
    if (direction == 'E') return 'East'
    else if (direction == 'W') return 'West'
    else if (direction == 'N') return 'North'
    else if (direction == 'S') return 'South'
    else if (direction == 'SE') return 'South East'
    else if (direction == 'SW') return 'South West'
    else if (direction == 'NE') return 'North East'
    else if (direction == 'NW') return 'North West'
    else return 'Random'
  }

  getImage = (select: string) => {
    if (select?.includes('Cloudy')) return '/assets/images/weather/cloudy.png'
    else if (select?.includes('Rainy')) return '/assets/images/weather/rainy.png'
    else if (select?.includes('Snow')) return '/assets/images/weather/snow.png'
    else if (select?.includes('Sunny')) return '/assets/images/weather/sunny.png'
    else return '/assets/images/weather/clear.png'
  }
}