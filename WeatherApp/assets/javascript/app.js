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
      });
    }, searchTimeOutDuration);
  }
});
