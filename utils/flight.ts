export interface AirportJson {
  icao: string;
  iata: string;
  lon: number;
  name: string;
  lat: number;
  country: string;
  state: string;
  city: string;
  elevation: number;
  randomlyGenerated?: boolean;
}

export interface FlightJson {
  departure: AirportJson;
  arrival: AirportJson;
  bearing: number;
  distance: number;
  isValid: boolean;
  elevationChange: number;
}
