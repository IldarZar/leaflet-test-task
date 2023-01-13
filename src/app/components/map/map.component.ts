import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  // Текущее значение выбранного города.
  // Значение этого свойства может быть изменено в этой компоненте или в cities-list. 
  @Input() currentCity!: string;

  // Все города которые мы можем получить от родительской компоненты.
  @Input() cities!: City[];

  // Emitter нужен для сообщения об изменении свойства currentCity родителю.
  @Output() currentCityChanges = new EventEmitter();
  
  // Приватные свойства карты и всех созданных маркеров.
  private map!: L.Map;
  private markers: Map<string, L.Marker> = new Map();

  constructor() {}

  ngOnInit(): void {
    // Инициализируем карту (задаем все необходимые настройки по документации).
    this.initMap();

    // Отображаем каждый город на карте.
    this.cities.forEach(city => {
      // Создаем маркер и помещаем его в map.
      const marker = L.marker(city.coordinates).addTo(this.map).bindPopup(city.viewValue);
      this.markers.set(city.value, marker);

      // При нажатии на маркер значение в выпадающем списке будет меняться.
      marker.addEventListener('click', () => {
        this.currentCity = city.value
        this.currentCityChanges.emit(city.value);
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Отслеживаем изменение родительского св-ва currentCity.
    const selectedCity = this.markers.get(changes['currentCity'].currentValue);
    selectedCity?.openPopup();
    this.map.setView(selectedCity!.getLatLng(), 9);
  }

  initMap() {
    this.map = L.map('map', {
      center: this.cities[0].coordinates,
      zoom: 9
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }
}
