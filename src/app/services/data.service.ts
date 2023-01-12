import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // fake data
  private cities: City[] = [
    {
      value: 'London',
      viewValue: 'Лондон',
      coordinates: [51.5, -0.09]
    },
    {
      value: 'Bristol',
      viewValue: 'Бристоль',
      coordinates: [51.4552, -2.59665]
    },
    {
      value: 'Norwich',
      viewValue: 'Норвич',
      coordinates: [52.62783, 1.29834]
    },
    {
      value: 'Birmingham',
      viewValue: 'Бирмингем',
      coordinates: [52.4814, -1.89983]
    }
  ];

  constructor() { }

  public getCities(): Observable<City> {
    return from(this.cities);
  }
}
