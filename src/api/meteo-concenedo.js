// api per meteo-valsassina

import weatherlinkData from "../lib/weatherlink.js";
export const handler = async function (event) {
  let data;
  let errorMessage;
  try {
    data = await weatherlinkData();
  } catch (error) {
    console.error("Weatherlink error:", error); // Log the error for debugging
    // Try to get a useful error message
    errorMessage =
      error?.message ||
      error?.toString() ||
      JSON.stringify(error) ||
      "Unknown error";
    throw new Error(`Error fetching weather data: ${errorMessage}`);
  }

  const response = data;

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: !errorMessage,
      data: response,
      error: errorMessage || null,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
