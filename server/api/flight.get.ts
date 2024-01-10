import flightGenerator from "random-flight-generator";

export default defineEventHandler<{
  query: {
    minDistance?: number;
    maxDistance?: number;
    departure?: string;
    arrival?: string;
    includeCountries?: string[];
    excludeCountries?: string[];
    majorAirportsOnly?: boolean;
  };
}>((event) => {
  const q = getQuery(event);

  return flightGenerator({
    minDistance: q.minDistance,
    maxDistance: q.maxDistance,
    departure: q.departure,
    arrival: q.arrival,
    includeCountries: q.includeCountries,
    excludeCountries: q.excludeCountries,
    majorAirportsOnly: q.majorAirportsOnly,
  });
});
