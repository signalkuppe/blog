// api per meteo-valsassina

import weatherlinkData from "../lib/weatherlink.js";
export const handler = async function (event) {
  let data;
  let errorMessage;
  try {
    data = await weatherlinkData();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${errorMessage}`);
  }

  const response = data;

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: !errorMessage,
      data: response,
      error: errorMessage ? { message: errorMessage } : null,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
