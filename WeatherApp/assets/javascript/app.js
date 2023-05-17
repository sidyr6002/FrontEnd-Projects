"use strict";

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
 * Add events listnes on multiple elements
 * @param {NodeList} elements  Elements node array
 * @param {string} eventType Event Type eg: "click", "mouseover"
 * @param {Function} callback Callback Funtion
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

/**
 * Toggle search in mobile devices
 */
const searchView = document.querySelector("[data-search-view]");
const searchToggles = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchToggles, "click", toggleSearch);

/**
 * Search integration
 */
const searchFeild = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeOutDuration = 500;

searchFeild.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);

  if (!searchFeild.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchFeild.classList.remove("searching");
  } else {
    searchFeild.classList.add("searching");
  }

  if (searchFeild.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geocoding(searchFeild.value), function (locations) {
        searchFeild.classList.remove("searching");
        searchFeild.classList.add("active");
        searchResult.innerHTML = `
                    <ul class="view-list" data-search-list>
                    </ul>
                `;

        const /** {NodeList} | [] */ items = [];

        for (const { name, lat, lon, country, state } of locations) {
          const searchItem = document.createElement("li");
          searchItem.classList.add("view-item");

          searchItem.innerHTML = `
                    <span class="m-icon">location_on</span>
                    <div>
                        <p class="item-title">${name}</p>
                        <p class="label-2 item-subtitle">${
                          state || ""
                        } ${country}</p>
                    </div>

                    <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
                `;

          searchResult
            .querySelector("[data-search-list]")
            .appendChild(searchItem);

          items.push(searchItem.querySelector("[data-search-toggler]"));
        }

        addEventOnElements(items, "click", function() {
            toggleSearch();
            searchResult.classList.remove("active")
        })
      });
    }, searchTimeOutDuration);
  }
});

const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
const errorContent = document.querySelector("[data-error-content]");

/**
 *
 * @param {number} lat latitude
 * @param {number} lon longitude
 */
export const updateWeather = function (lat, lon) {
    console.log("Coordinates : " + lat.toString() + ' ' + lon.toString())
    
    //loading.style.display = "grid";
    container.style.overflowY = "hidden";
    container.classList.contains("fade-in") ??
        container.classList.remove("fade-in");
    errorContent.style.display = "none";

    const currentWeatherSection = document.querySelector("[data-current-weather]");
    const highlightSection = document.querySelector("[data-highlights]");
    const hourlyForecatSection = document.querySelector("[data-hourly-forecast]");
    const fiveDayForecastSection = document.querySelector("[data-5-day-forecast]");

    currentWeatherSection.innerHTML = ``;
    highlightSection.innerHTML = ``;
    hourlyForecatSection.innerHTML = ``;
    fiveDayForecastSection.innerHTML = ``;

    if (window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "");
    } else {
        currentLocationBtn.removeAttribute("disabled");
    }

    /**
     * Current Weather Section
     */
    fetchData(url.currentWeather(lat, lon), function (currentWeather) {
        const {
            weather,
            dt: dateUnix,
            sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
            main: { temp, feels_like, pressure, humidity },
            visibility,
            timezone,
        } = currentWeather;
        const [{ description, icon }] = weather;

        const card = document.createElement("div");
        card.classList.add("card", "card-lg", "current-weather-card");

        card.innerHTML = `
            <h2 class="title-2 card-tittle">Now</h2>
        
            <div class="weapper">
                <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>
                <img src="./assets/images/weather_icons/${icon}.png" width="64" height="64" alt="${description}" class="weather-icon">
            </div>

            <p class="body-3">${description}</p>

            <ul class="meta-list">
                <li class="meta-item">
                    <span class="m-icon">calendar_today</span>
                    <p class="title-3 meta-text">
                        ${module.getDate(dateUnix, timezone)}
                    </p>
                </li>
                <li class="meta-item">
                    <span class="m-icon">location_on</span>
                    <p class="title-3 meta-text" data-location></p>
                </li>
            </ul>
        `;

        fetchData(url.geocoding_rev(lat, lon), function ([{ name, country }]) {
        card.querySelector("[data-location]").innerHTML = `${name}, ${country}`;
        });

        currentWeatherSection.appendChild(card);
  });
};


export const error404 = function () {};
