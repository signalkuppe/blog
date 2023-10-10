const dayjs = require('dayjs');
const _ = require('lodash');
const STATION_ID = '168235';
const CONSOLE_SENSOR_ID = 653401;
const TETTO_SENSOR_ID = 656258;
const PRATO_SENSOR_ID = 653403;
const API_KEY = process.env.SIGNALKUPPE_WEBSITE_WEATHERLINK_APIKEY;
const API_SECRET = process.env.SIGNALKUPPE_WEBSITE_WEATHERLINK_SECRET;
const START_OF_TODAY = dayjs().startOf('day').add(1, 'minute').unix();
const END_OF_TODAY = dayjs().endOf('day').unix();

exports.handler = async function () {
    try {
        const { sensors: currentSensors } = await fetchCurrentData();
        const { sensors: historicSensor } = await fetchHistoricData(
            START_OF_TODAY,
            END_OF_TODAY,
        );
        const weatherlinkConsole = sensorData(
            currentSensors,
            CONSOLE_SENSOR_ID,
        );
        const pratoCurrent = sensorData(currentSensors, PRATO_SENSOR_ID);
        const tettoCurrent = sensorData(currentSensors, TETTO_SENSOR_ID);
        const last_trasmission_date = new Date(
            pratoCurrent.last_packet_received_timestamp * 1000,
        );

        const consoleDailyValues = sensorData(
            historicSensor,
            CONSOLE_SENSOR_ID,
            true,
        );

        const pratoDailyValues = sensorData(
            historicSensor,
            PRATO_SENSOR_ID,
            true,
        );

        const tettoDailyValues = sensorData(
            historicSensor,
            TETTO_SENSOR_ID,
            true,
        );

        const readableData = {
            ok: true,
            current: {
                last_received: last_trasmission_date,
                last_data_day: last_trasmission_date
                    .toLocaleDateString('it-IT')
                    .padStart(10, '0'),
                last_data_hour: `${last_trasmission_date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${last_trasmission_date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`,
                pressure: convertPressure(weatherlinkConsole.bar_sea_level),
                pressure_trend: convertPressureTrend(
                    weatherlinkConsole.bar_trend,
                ),
                temperature: convertTemperature(pratoCurrent.temp),
                temperature_tetto: convertTemperature(tettoCurrent.temp),
                humidity: Math.round(pratoCurrent.hum),
                humidity_tetto: Math.round(tettoCurrent.hum),
                dew_point: convertTemperature(pratoCurrent.dew_point),
                wind_chill: convertTemperature(pratoCurrent.wind_chill),
                wet_bulb: convertTemperature(pratoCurrent.wet_bulb),
                heat_index: convertTemperature(pratoCurrent.heat_index),
                wind: convertWindSpeed(tettoCurrent.wind_speed_last),
                wind_direction: convertWindDirection(
                    tettoCurrent.wind_dir_last,
                ),
                rain_rate: tettoCurrent.rain_rate_last_mm,
                rain_rate_last_15_min: tettoCurrent.rain_rate_hi_last_15_min_mm,
                rain: tettoCurrent.rainfall_day_mm,
                rain_month: tettoCurrent?.rainfall_month_mm,
                rain_year: tettoCurrent?.rainfall_year_mm,
                solar_radiation: tettoCurrent.solar_rad,
                et_day: tettoCurrent.et_day,
                et_year: tettoCurrent.et_year,
            },
            day: {
                temperature_max: maxTemperature(pratoDailyValues, 'temp_hi'),
                temperature_max_at: maxTemperatureHour(
                    pratoDailyValues,
                    'temp_hi',
                ),
                temperature_min: minTemperature(pratoDailyValues, 'temp_lo'),
                temperature_min_at: minTemperatureHour(
                    pratoDailyValues,
                    'temp_lo',
                ),
                temperature_tetto_max: maxTemperature(
                    tettoDailyValues,
                    'temp_hi',
                ),
                temperature_tetto_max_at: maxTemperatureHour(
                    tettoDailyValues,
                    'temp_hi',
                ),
                temperature_tetto_min: minTemperature(
                    tettoDailyValues,
                    'temp_lo',
                ),
                temperature_tetto_min_at: minTemperatureHour(
                    tettoDailyValues,
                    'temp_lo',
                ),
                pressure_max: convertPressure(
                    findLastMaxPropertyItem(consoleDailyValues, 'bar_hi')[
                        'bar_hi'
                    ],
                ),
                pressure_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(consoleDailyValues, 'bar_hi')[
                        'bar_hi'
                    ],
                ),
                pressure_min_at: unixToHourAndSecods(
                    findLastMinPropertyItem(consoleDailyValues, 'bar_lo')[
                        'bar_lo'
                    ],
                ),
                pressure_min: convertPressure(
                    findLastMinPropertyItem(consoleDailyValues, 'bar_lo')[
                        'bar_lo'
                    ],
                ),
                humidity_max: Math.round(
                    findLastMaxPropertyItem(pratoDailyValues, 'hum_hi')[
                        'hum_hi'
                    ],
                ),
                humidity_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(pratoDailyValues, 'hum_hi')[
                        'hum_hi_at'
                    ],
                ),
                humidity_min: Math.round(
                    findLastMinPropertyItem(pratoDailyValues, 'hum_lo')[
                        'hum_lo'
                    ],
                ),
                humidity_min_at: unixToHourAndSecods(
                    findLastMinPropertyItem(pratoDailyValues, 'hum_lo')[
                        'hum_hi_at'
                    ],
                ),
                humidity_tetto_max: Math.round(
                    findLastMaxPropertyItem(tettoDailyValues, 'hum_hi')[
                        'hum_hi'
                    ],
                ),
                humidity_tetto_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(tettoDailyValues, 'hum_hi')[
                        'hum_hi_at'
                    ],
                ),
                humidity_tetto_min: Math.round(
                    findLastMinPropertyItem(tettoDailyValues, 'hum_lo')[
                        'hum_lo'
                    ],
                ),
                humidity_tetto_min_at: unixToHourAndSecods(
                    findLastMinPropertyItem(tettoDailyValues, 'hum_lo')[
                        'hum_hi_at'
                    ],
                ),
                heat_index_max: maxTemperature(
                    pratoDailyValues,
                    'heat_index_hi',
                ),
                heat_index_max_at: maxTemperatureHour(
                    pratoDailyValues,
                    'heat_index_hi',
                ),
                wind_chill_min: minTemperature(
                    pratoDailyValues,
                    'wind_chill_lo',
                ),
                wind_chill_min_at: minTemperatureHour(
                    pratoDailyValues,
                    'wind_chill_lo',
                ),
                dew_point_max: maxTemperature(pratoDailyValues, 'dew_point_hi'),
                dew_point_max_at: maxTemperatureHour(
                    pratoDailyValues,
                    'dew_point_hi',
                ),
                dew_point_min: minTemperature(pratoDailyValues, 'dew_point_lo'),
                dew_point_min_at: minTemperatureHour(
                    pratoDailyValues,
                    'dew_point_lo',
                ),
                wet_bulb_min: minTemperature(pratoDailyValues, 'wet_bulb_lo'),
                wet_bulb_min_at: minTemperatureHour(
                    pratoDailyValues,
                    'wet_bulb_lo',
                ),
                wet_bulb_max: minTemperature(pratoDailyValues, 'wet_bulb_hi'),
                wet_bulb_max_at: minTemperatureHour(
                    pratoDailyValues,
                    'wet_bulb_hi',
                ),
                solar_radiation_max: findLastMaxPropertyItem(
                    tettoDailyValues,
                    'solar_rad_hi',
                ).solar_rad_hi,
                solar_radiation_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(tettoDailyValues, 'solar_rad_hi')
                        .solar_rad_hi_at,
                ),
                wind_max: convertWindSpeed(
                    findLastMaxPropertyItem(tettoDailyValues, 'wind_speed_hi')
                        .wind_speed_hi,
                ),
                wind_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(tettoDailyValues, 'wind_speed_hi')
                        .wind_speed_hi_at,
                ),
                wind_max_dir: convertWindDirection(
                    findLastMaxPropertyItem(tettoDailyValues, 'wind_speed_hi')
                        .wind_speed_hi_dir,
                ),
                wind_prevailing_dir:
                    calculatePrevailingWindDirection(tettoDailyValues),
                rain_rate_max: findLastMaxPropertyItem(
                    tettoDailyValues,
                    'rain_rate_hi_mm',
                ).rain_rate_hi_mm,
                rain_rate_max_at: unixToHourAndSecods(
                    findLastMaxPropertyItem(tettoDailyValues, 'rain_rate_hi_mm')
                        .rain_rate_hi_at,
                ),
                graph_temperature: _.map(pratoDailyValues, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(convertTemperature(v.temp_last)),
                })),
                graph_humidity: _.map(pratoDailyValues, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(v.hum_last),
                })),
                graph_pressure: _.map(consoleDailyValues, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(convertPressure(v.bar_hi)),
                })),
                graph_dew_point: _.map(pratoDailyValues, (v) => ({
                    hour: unixToHour(v.ts),
                    value: convertTemperature(v.dew_point_last),
                })),
                graph_wind: _.map(pratoDailyValues, (v) => ({
                    hour: unixToHour(v.ts),
                    value: convertWindSpeed(v.wind_speed_hi),
                })),
                graph_wind_dir: _.map(pratoDailyValues, (v) => ({
                    hour: unixToHour(v.ts),
                    value: convertWindDirection(v.wind_dir_of_prevail),
                })),
                graph_rain: _.map(pratoDailyValues, (v) => ({
                    hour: unixToHour(v.ts),
                    value: v.rainfall_mm,
                })),
                graph_rain_rate: _.map(pratoDailyValues, (v) => ({
                    hour: unixToHour(v.ts),
                    value: v.rain_rate_hi_mm,
                })),
            },
        };

        return {
            statusCode: 200,
            body: JSON.stringify(readableData),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};

async function fetchCurrentData() {
    const response = await fetch(
        `https://api.weatherlink.com/v2/current/${STATION_ID}?api-key=${API_KEY}`,
        {
            headers: {
                'x-api-secret': API_SECRET,
            },
        },
    );
    const jsonData = await response.json();
    return jsonData;
}

async function fetchHistoricData(startTimeStamp, endTimeStamp) {
    const response = await fetch(
        `https://api.weatherlink.com/v2/historic/${STATION_ID}?api-key=${API_KEY}&start-timestamp=${startTimeStamp}&end-timestamp=${endTimeStamp}`,
        {
            headers: {
                'x-api-secret': API_SECRET,
            },
        },
    );
    const jsonData = await response.json();
    return jsonData;
}

function sensorData(sensors, sensorId, historic) {
    const sensor = sensors.find((sensor) => sensor.lsid === sensorId);
    return !historic ? sensor.data[0] : sensor.data;
}

function convertPressure(pressure) {
    /** Inches of mercury to hectopascal */
    return Math.round(pressure * 33.863889532610884);
}

function convertPressureTrend(pressureTrend) {
    /** Inches of mercury to hectopascal */
    if (pressureTrend <= -0.06) {
        return 'In forte diminuzione';
    } else if (pressureTrend > -0.06 && pressureTrend < -0.02) {
        return 'In diminuzione';
    } else if (pressureTrend > 0.02 && pressureTrend < 0.06) {
        return 'In aumento';
    } else if (pressureTrend >= 0.06) {
        return 'In forte aumento';
    } else {
        return 'Stabile';
    }
}

function convertTemperature(temperature) {
    /** Fahrenheit to Celsius */
    return ((temperature - 32) * (5 / 9)).toFixed(1);
}

function convertWindSpeed(mph) {
    /** MPH to km/h */
    return (mph * 1.60934).toFixed(1);
}

function convertWindDirection(degree) {
    const val = Math.floor(degree / 22.5 + 0.5);
    const arr = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ];
    return arr[val % 16];
}

function unixToHour(unix) {
    return dayjs.unix(unix).format('HH');
}

function unixToGraphTime(unix) {
    return dayjs.unix(unix).format('YYYY-MM-DD HH:mm');
}

function unixToHourAndSecods(unix) {
    return dayjs.unix(unix).format('HH:mm');
}

function findLastMaxPropertyItem(arr, property) {
    if (arr.length === 0) {
        return null;
    }

    let maxItem = null;
    let maxValue = -Infinity;

    for (let i = arr.length - 1; i >= 0; i--) {
        const currentItemValue = arr[i][property];
        if (currentItemValue >= maxValue && currentItemValue !== null) {
            maxValue = currentItemValue;
            maxItem = arr[i];
        }
    }

    return maxItem;
}

function findLastMinPropertyItem(arr, property) {
    if (arr.length === 0) {
        return null; // Return null if the array is empty
    }

    let minItem = arr[arr.length - 1]; // Start with the last item
    let minValue = arr[arr.length - 1][property];

    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i][property] <= minValue && arr[i][property] !== null) {
            minValue = arr[i][property];
            minItem = arr[i];
        }
    }

    return minItem;
}

function maxTemperature(arr, property) {
    return convertTemperature(findLastMaxPropertyItem(arr, property)[property]);
}

function maxTemperatureHour(arr, property) {
    return unixToHourAndSecods(
        findLastMaxPropertyItem(arr, property)[`${property}_at`],
    );
}

function minTemperature(arr, property) {
    return convertTemperature(findLastMinPropertyItem(arr, property)[property]);
}

function minTemperatureHour(arr, property) {
    return unixToHourAndSecods(
        findLastMinPropertyItem(arr, property)[`${property}_at`],
    );
}

function calculatePrevailingWindDirection(tettoDailyValues) {
    const degreesArray = _.map(tettoDailyValues, 'wind_dir_of_prevail');
    if (degreesArray.length === 0) {
        return null; // Return null if the array is empty
    }

    let totalX = 0;
    let totalY = 0;

    // Convert wind directions to unit vectors (x, y components)
    for (const degrees of degreesArray) {
        const radians = degreesToRadians(degrees);
        totalX += Math.cos(radians);
        totalY += Math.sin(radians);
    }

    // Calculate the average direction in radians
    const averageRadians = Math.atan2(totalY, totalX);

    // Convert the average direction to degrees (0-360)
    const averageDegrees = (radiansToDegrees(averageRadians) + 360) % 360;

    return convertWindDirection(averageDegrees);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}
