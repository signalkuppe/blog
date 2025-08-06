// api per meteo-valsassina

import weatherlinkData from "../../lib/weatherlink.js";

export async function GET() {
  let data;
  try {
    data = await weatherlinkData();
  } catch (error) {
    console.error("Weatherlink error:", error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }

  return new Response(
    JSON.stringify({
      name: "Concenedo",
      lastUpdate: `${data.current.last_data_day} ${data.current.last_data_hour}`,
      pressure: parseFloat(data.current.pressure),
      temperature: parseFloat(data.current.temperature),
      temperatureMin: parseFloat(data.day.temperature_min),
      temperatureMinTime: data.day.temperature_min_at,
      temperatureMax: parseFloat(data.day.temperature_max),
      temperatureMaxTime: data.day.temperature_max_at,
      humidity: parseFloat(data.current.humidity),
      humidityMax: parseFloat(data.day.humidity_max),
      humidityMaxTime: data.day.humidity_max_at,
      humidityMin: parseFloat(data.day.humidity_min),
      humidityMinTime: data.day.humidity_min_at,
      windSpeed: parseFloat(data.current.wind),
      windGust: parseFloat(data.day.wind_max),
      windGustTime: data.day.wind_max_at,
      windGustDirection: data.day.wind_max_dir,
      windGustDirectionTime: data.day.wind_max_at,
      rainDaily: parseFloat(data.current.rain),
      rainMonthly: parseFloat(data.current.rain_month),
      rainYearly: parseFloat(data.current.rain_year),
      rainRate: parseFloat(data.current.rain_rate),
      dewPoint: parseFloat(data.current.dew_point),
      cords: [45.942644, 9.478628],
    }),
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
