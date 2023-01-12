import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css']
})
export class CitiesListComponent implements OnInit {
  // Текущее значение выбранного города.
  // Значение этого свойства может быть изменено в этой компоненте или в map. 
  @Input() currentCity!: any;

  // Все города которые мы можем получить от родительской компоненты.
  @Input() cities!: City[];

  // Emitter нужен для сообщения об изменении свойства currentCity родителю.
  @Output() currentCityChanges = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}
  
  setView(newCurrentCity: string): void {
    if(newCurrentCity) 
      this.currentCityChanges.emit(newCurrentCity);
  }
}
