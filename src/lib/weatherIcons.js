// Single source of truth for weather icon keys: forecast.js validates the
// keys it emits against this map, and WeatherIcon.astro resolves them to
// the Meteocons files in src/assets/weather-icons/.
// key → [day file, night file]
export const WEATHER_ICON_FILES = {
  clear: ["clear-day", "clear-night"],
  "mostly-clear": ["partly-cloudy-day", "partly-cloudy-night"],
  "partly-cloudy": ["overcast-day", "overcast-night"],
  cloudy: ["overcast", "overcast"],
  fog: ["fog-day", "fog-night"],
  drizzle: ["drizzle", "drizzle"],
  rain: ["rain", "rain"],
  "freezing-rain": ["sleet", "sleet"],
  snow: ["snow", "snow"],
  showers: ["partly-cloudy-day-rain", "partly-cloudy-night-rain"],
  "snow-showers": ["partly-cloudy-day-snow", "partly-cloudy-night-snow"],
  thunderstorm: ["thunderstorms-day-rain", "thunderstorms-night-rain"],
  "thunderstorm-hail": ["hail", "hail"],
};
