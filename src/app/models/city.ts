// Каждому маркеру на карте соответствует свой option в шаблоне, поэтому 
// св-во value - для аттрибута value в option,
// св-во viewValue - для отображения в popup'е маркера
export interface City {
  value: string;
  viewValue: string;
  coordinates: [number, number] 
}