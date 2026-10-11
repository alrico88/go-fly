import flightGenerator from "random-flight-generator";

type QueryValue = string | string[] | undefined;

// Query params always arrive as strings, so parse them before handing them to the generator
function toNumber(value: QueryValue) {
  const num = Number(value);

  return value === "" || Number.isNaN(num) ? undefined : num;
}

function toArray(value: QueryValue) {
  if (value === undefined) {
    return undefined;
  }

  return Array.isArray(value) ? value : [value];
}

export default defineEventHandler((event) => {
  const q = getQuery<Record<string, QueryValue>>(event);

  return flightGenerator({
    minDistance: toNumber(q.minDistance),
    maxDistance: toNumber(q.maxDistance),
    departure: q.departure || undefined,
    arrival: q.arrival || undefined,
    includeCountries: toArray(q.includeCountries),
    excludeCountries: toArray(q.excludeCountries),
    majorAirportsOnly: q.majorAirportsOnly === "true",
  });
});
