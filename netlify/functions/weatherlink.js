const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
const _ = require('lodash');
// const API_CACHE = require('../cache');
const STATION_ID = '168235';
const CONSOLE_SENSOR_ID = 653401;
const TETTO_SENSOR_ID = 656258;
const PRATO_SENSOR_ID = 653403;
const API_KEY = process.env.SIGNALKUPPE_WEBSITE_WEATHERLINK_APIKEY;
const API_SECRET = process.env.SIGNALKUPPE_WEBSITE_WEATHERLINK_SECRET;
const START_OF_TODAY = dayjs().startOf('day').utc().unix();
const ONE_DAY_BEFORE = dayjs().subtract(24, 'hours').utc().unix();
const NOW = dayjs().utc().unix();
const GRAPH_DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const TIMEZONE = 'Europe/Rome';

exports.handler = async function () {
    try {
        const { sensors: currentSensors } = await fetchCurrentData();
        const { sensors: oneDayBeforeSensors } = await fetchHistoricData(
            ONE_DAY_BEFORE,
            NOW,
        );

        const weatherlinkConsole = sensorData(
            currentSensors,
            CONSOLE_SENSOR_ID,
        );
        const pratoCurrent = sensorData(currentSensors, PRATO_SENSOR_ID);
        const tettoCurrent = sensorData(currentSensors, TETTO_SENSOR_ID);

        const consoleOneDayBefore = sensorData(
            oneDayBeforeSensors,
            CONSOLE_SENSOR_ID,
            true,
        );
        const pratoOneDayBefore = sensorData(
            oneDayBeforeSensors,
            PRATO_SENSOR_ID,
            true,
        );
        const tettoOneDayBefore = sensorData(
            oneDayBeforeSensors,
            TETTO_SENSOR_ID,
            true,
        );

        // filter day values

        const consoleDailyValues = _.filter(
            consoleOneDayBefore,
            (d) => d.ts >= START_OF_TODAY && d.ts <= NOW,
        );
        const pratoDailyValues = _.filter(
            pratoOneDayBefore,
            (d) => d.ts >= START_OF_TODAY && d.ts <= NOW,
        );
        const tettoDailyValues = _.filter(
            tettoOneDayBefore,
            (d) => d.ts >= START_OF_TODAY && d.ts <= NOW,
        );

        const readableData = {
            ok: true,
            current: {
                last_data_day: formatDate(
                    tettoCurrent.last_packet_received_timestamp,
                    'DD/MM/YYYY',
                ),
                last_data_hour: formatDate(
                    tettoCurrent.last_packet_received_timestamp,
                    'HH:mm',
                ),
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
                pressure_max_at: unixToHourAndMinutes(
                    findLastMaxPropertyItem(consoleDailyValues, 'bar_hi')[
                        'bar_hi'
                    ],
                ),
                pressure_min_at: unixToHourAndMinutes(
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
                humidity_max_at: unixToHourAndMinutes(
                    findLastMaxPropertyItem(pratoDailyValues, 'hum_hi')[
                        'hum_hi_at'
                    ],
                ),
                humidity_min: Math.round(
                    findLastMinPropertyItem(pratoDailyValues, 'hum_lo')[
                        'hum_lo'
                    ],
                ),
                humidity_min_at: unixToHourAndMinutes(
                    findLastMinPropertyItem(pratoDailyValues, 'hum_lo')[
                        'hum_hi_at'
                    ],
                ),
                humidity_tetto_max: Math.round(
                    findLastMaxPropertyItem(tettoDailyValues, 'hum_hi')[
                        'hum_hi'
                    ],
                ),
                humidity_tetto_max_at: unixToHourAndMinutes(
                    findLastMaxPropertyItem(tettoDailyValues, 'hum_hi')[
                        'hum_hi_at'
                    ],
                ),
                humidity_tetto_min: Math.round(
                    findLastMinPropertyItem(tettoDailyValues, 'hum_lo')[
                        'hum_lo'
                    ],
                ),
                humidity_tetto_min_at: unixToHourAndMinutes(
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
                solar_radiation_max_at: unixToHourAndMinutes(
                    findLastMaxPropertyItem(tettoDailyValues, 'solar_rad_hi')
                        .solar_rad_hi_at,
                ),
                wind_max: convertWindSpeed(
                    findLastMaxPropertyItem(tettoDailyValues, 'wind_speed_hi')
                        .wind_speed_hi,
                ),
                wind_max_at: unixToHourAndMinutes(
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
                rain_rate_max_at: unixToHourAndMinutes(
                    findLastMaxPropertyItem(tettoDailyValues, 'rain_rate_hi_mm')
                        .rain_rate_hi_at,
                ),
                graph_temperature: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(convertTemperature(v.temp_last)),
                })),
                graph_temperature_tetto_prato: [
                    {
                        id: '2m',
                        data: _.map(pratoOneDayBefore, (v) => ({
                            x: unixToGraphTime(v.ts),
                            y: parseFloat(convertTemperature(v.temp_last)),
                        })),
                    },
                    {
                        id: '12m',
                        data: _.map(tettoOneDayBefore, (v) => ({
                            x: unixToGraphTime(v.ts),
                            y: parseFloat(convertTemperature(v.temp_last)),
                        })),
                    },
                ],
                graph_humidity: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(v.hum_last),
                })),
                graph_pressure: _.map(consoleOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: convertPressure(v.bar_hi),
                })),
                graph_dew_point: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: convertTemperature(v.dew_point_last),
                })),
                graph_wind: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(convertWindSpeed(v.wind_speed_avg)),
                    dir: convertWindDirection(v.wind_dir_of_prevail), // needed in tooltip
                })),
                graph_wind_max: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: parseFloat(convertWindSpeed(v.wind_speed_hi)),
                    dir: convertWindDirection(v.wind_speed_hi_dir), // needed in tooltip
                })),
                graph_wind_dir: _.map(pratoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: v.wind_dir_of_prevail, // we need numbers, then we format them i  the graph
                    dir: convertWindDirection(v.wind_dir_of_prevail),
                })),
                graph_wind_dir_pie: windPieChart(tettoOneDayBefore),
                graph_rain_rate: _.map(tettoOneDayBefore, (v) => ({
                    x: unixToGraphTime(v.ts),
                    y: v.rain_rate_hi_mm,
                })),
            },
        };

        return {
            statusCode: 200,
            body: JSON.stringify(readableData),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, s-maxage=300',
            },
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers: {},
            body: JSON.stringify(err),
        };
    }
};

async function fetchCurrentData() {
    console.log('Feching current data');
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
    console.log('Feching historical data', {
        start: startTimeStamp,
        end: endTimeStamp,
    });
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
    const sensor = sensors?.find((sensor) => sensor?.lsid === sensorId);
    return !historic ? sensor?.data[0] : sensor?.data;
}

function convertPressure(pressure) {
    /** Inches of mercury to hectopascal */
    return pressure ? Math.round(pressure * 33.863889532610884) : null;
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
    return temperature
        ? ((temperature - 32) * (5 / 9)).toFixed(1).toLocaleString('it-IT')
        : null;
}

function convertWindSpeed(mph) {
    /** MPH to km/h */
    return mph ? (mph * 1.60934).toFixed(1) : null;
}

function convertWindDirection(degree) {
    const val = degree ? Math.floor(degree / 22.5 + 0.5) : null;
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

function formatDate(ts, format) {
    return dayjs.unix(ts).utc().tz(TIMEZONE).format(format);
}

function unixToHourAndMinutes(ts) {
    return formatDate(ts, 'HH:mm');
}

function unixToGraphTime(ts) {
    return formatDate(ts, GRAPH_DATE_FORMAT);
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
    return unixToHourAndMinutes(
        findLastMaxPropertyItem(arr, property)[`${property}_at`],
    );
}

function minTemperature(arr, property) {
    return convertTemperature(findLastMinPropertyItem(arr, property)[property]);
}

function minTemperatureHour(arr, property) {
    return unixToHourAndMinutes(
        findLastMinPropertyItem(arr, property)[`${property}_at`],
    );
}

function windPieChart(data) {
    const windDirCounts = _.countBy(
        _.map(data, 'wind_dir_of_prevail'),
        _.identity,
    );

    const total = _.sum(_.values(windDirCounts));

    const resultArray = _.filter(
        _.map(windDirCounts, (count, windDir) => ({
            id: convertWindDirection(parseInt(windDir, 10)),
            label: convertWindDirection(parseInt(windDir, 10)),
            value: Math.round((count / total) * 100),
        })),
        (v) => v.value >= 5,
    );

    return resultArray;
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
