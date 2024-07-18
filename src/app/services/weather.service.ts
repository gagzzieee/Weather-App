import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 
  private apiKey = '8deef84323987c0ebf156c7739e2eeb6';
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.weatherApiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getForecast(city: string): Observable<any> {
    const url = `${this.forecastApiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        
        const dailyForecast: any[] = [];
        const forecastMap = new Map<string, any>();

        data.list.forEach((entry: any) => {
          const entryDate = new Date(entry.dt_txt).toLocaleDateString();
          if (!forecastMap.has(entryDate)) {
            forecastMap.set(entryDate, {
              date: entry.dt_txt,
              temp: entry.main.temp,
              weather: entry.weather[0].main,
              icon: entry.weather[0].icon 
            });
          }
        });

        forecastMap.forEach((value, key) => {
          if (dailyForecast.length < 3) {
            dailyForecast.push(value);
          }
        });

        return dailyForecast;
      })
    );
  }
}
