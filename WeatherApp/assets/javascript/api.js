"use strict";

const api_key = window.env.API_KEY; // Hiding the Key from public

/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback callback
 */
export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then((res) => res.json())
    .then((data) => callback(data));
};

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },
  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },
  geocoding_rev(lat, lon) {
    return`http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },
  /**
   * @param {string} query Search query eg: Hyderbad,IN or Chennai,IN
   */
  geocoding(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};
