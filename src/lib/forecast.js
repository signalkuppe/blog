// 3-day forecast for Concenedo from Open-Meteo (free, no API key).
// Fetched server-side during the page render; the page's CDN caching means
// visitors never wait on this call.
import { WEATHER_ICON_FILES } from "./weatherIcons.js";
const LATITUDE = 45.942644;
const LONGITUDE = 9.478628;
// Station altitude: Open-Meteo corrects temperatures to this height instead
// of the model terrain elevation for the grid cell (~926m).
const STATION_ELEVATION = 920;
const FORECAST_DAYS = 3;
const TIMEZONE = "Europe/Rome";
const CACHE_TTL_MS = 15 * 60 * 1000; // forecasts update hourly at most

// WMO weather interpretation codes → icon key + Italian description.
const WMO_CODES = {
  0: { icon: "clear", description: "Sereno" },
  1: { icon: "mostly-clear", description: "Poco nuvoloso" },
  2: { icon: "partly-cloudy", description: "Parzialmente nuvoloso" },
  3: { icon: "cloudy", description: "Coperto" },
  45: { icon: "fog", description: "Nebbia" },
  48: { icon: "fog", description: "Nebbia con brina" },
  51: { icon: "drizzle", description: "Pioviggine debole" },
  53: { icon: "drizzle", description: "Pioviggine moderata" },
  55: { icon: "drizzle", description: "Pioviggine intensa" },
  56: { icon: "freezing-rain", description: "Pioviggine gelata debole" },
  57: { icon: "freezing-rain", description: "Pioviggine gelata intensa" },
  61: { icon: "rain", description: "Pioggia debole" },
  63: { icon: "rain", description: "Pioggia moderata" },
  65: { icon: "rain", description: "Pioggia forte" },
  66: { icon: "freezing-rain", description: "Pioggia gelata debole" },
  67: { icon: "freezing-rain", description: "Pioggia gelata forte" },
  71: { icon: "snow", description: "Neve debole" },
  73: { icon: "snow", description: "Neve moderata" },
  75: { icon: "snow", description: "Neve forte" },
  77: { icon: "snow", description: "Nevischio" },
  80: { icon: "showers", description: "Rovesci deboli" },
  81: { icon: "showers", description: "Rovesci moderati" },
  82: { icon: "showers", description: "Rovesci violenti" },
  85: { icon: "snow-showers", description: "Rovesci di neve deboli" },
  86: { icon: "snow-showers", description: "Rovesci di neve forti" },
  95: { icon: "thunderstorm", description: "Temporale" },
  96: { icon: "thunderstorm-hail", description: "Temporale con grandine" },
  99: { icon: "thunderstorm-hail", description: "Temporale con grandine forte" },
};

// An emitted icon key must exist in the shared icon map, otherwise
// WeatherIcon would silently render its fallback.
function iconFor(code) {
  const icon = WMO_CODES[code]?.icon;
  return WEATHER_ICON_FILES[icon] ? icon : "cloudy";
}

// Module-scope cache: warm invocations within the TTL skip the network call.
let cache = null;

export default async function forecast() {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const params = new URLSearchParams({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max",
        "wind_speed_10m_max",
      ].join(","),
      // Current sky condition for the widget icon (the station measures
      // numbers, not "sunny/cloudy"); is_day allows a night icon variant.
      current: ["weather_code", "is_day"].join(","),
      timezone: TIMEZONE,
      // +1: the response includes today, which is sliced off below.
      forecast_days: FORECAST_DAYS + 1,
    });
    if (STATION_ELEVATION != null) {
      params.set("elevation", STATION_ELEVATION);
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { signal: controller.signal },
    );
    if (!response.ok) {
      throw new Error(`Open-Meteo request failed: ${response.status}`);
    }
    const { daily, current } = await response.json();

    const days = daily.time.slice(1).map((date, i) => {
      const index = i + 1; // skip today
      const code = daily.weather_code[index];
      return {
        date,
        weekday: new Intl.DateTimeFormat("it-IT", {
          weekday: "short",
          timeZone: TIMEZONE,
        }).format(new Date(date)),
        weatherCode: code,
        icon: iconFor(code),
        description: WMO_CODES[code]?.description ?? "Variabile",
        temperatureMax: daily.temperature_2m_max[index],
        temperatureMin: daily.temperature_2m_min[index],
        precipitation: daily.precipitation_sum[index],
        precipitationProbability: daily.precipitation_probability_max[index],
        windMax: daily.wind_speed_10m_max[index],
      };
    });

    const currentCode = current?.weather_code;
    const data = {
      ok: true,
      current: {
        weatherCode: currentCode,
        icon: iconFor(currentCode),
        description: WMO_CODES[currentCode]?.description ?? "Variabile",
        isDay: current?.is_day === 1,
      },
      days,
    };
    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch (err) {
    console.error("Forecast fetch failed:", err.message);
    return { ok: false, current: null, days: [] };
  } finally {
    clearTimeout(timeout);
  }
}
