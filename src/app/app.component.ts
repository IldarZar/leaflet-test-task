import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { City } from './models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentCity: string = 'default';
  cities: City[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getCities().subscribe((city: City) => this.cities.push(city))
  }

  setView(newCurrentCity: string): void {
    this.currentCity = newCurrentCity;
  }
}
