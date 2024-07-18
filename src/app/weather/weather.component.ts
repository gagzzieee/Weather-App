import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
  
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  selectedCity = '';
  forecast: any[] = [];
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
   
    this.selectedCity = 'Delhi';
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.selectedCity).subscribe(
      data => {
        this.weatherData = data;
        this.errorMessage = '';
      },    
      error => {
        this.errorMessage = 'Error fetching weather data';
        this.weatherData = null;
      }
    );

    this.weatherService.getForecast(this.selectedCity).subscribe(
      data => {
        this.forecast = data;
      },
      error => {
        this.errorMessage = 'Error fetching forecast data';
      }
    );
  
}
}
