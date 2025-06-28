// get Api key and baseUrl====================
let apiKey = "8c4be7c8bee0497f995212233252506";
let basUrl = "https://api.weatherapi.com/v1/forecast.json?";
let date = new Date();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "saturday",
];
let months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
let row = document.getElementById("row");
let searchInput = document.getElementById("search");
// get user location=======================
async function getUserLocation() {
  let res = await fetch("https://ipapi.co/json/");
  let data = await res.json();
  getApi(data.region);
  
}
getUserLocation();

// let get api=========================================
async function getApi(city) {
  let loader = document.querySelector('.loader')
  try {
    let res = await fetch(`${basUrl}key=${apiKey}&q=${city}&days=3`);
    let data = await res.json();
    loader.classList.add('d-none')
    // display functions============================
    dispayCurrentDay(data);
    displayTomorrowDay(data);
    displayAfterTomorrowDay(data)
  } catch (error) {
    row.innerHTML = `<div class="alert alert-danger text-capitalize w-100">somthing went wrong</div>`
  }
}

// display current day===============================================

function dispayCurrentDay(data) {
  
  // day and month========================================
  let day = days[date.getDay()];
  let month = date.getDate() + months[date.getMonth()];
  // get current day===========================
  let currentData = data.forecast.forecastday[0];
  // displayData==================================================
  let current = `
     <section class="col p-0">
            <section class="inner pb-3" id="current-day">
              <section
                class="head d-flex justify-content-between align-items-center px-3 py-2 mb-4"
              >
                <p class="m-0">${day}</p>
                <p class="m-0">${month}</p>
              </section>
              <section class="weather-body px-4">
                <section class="degree d-flex align-items-center flex-wrap">
                  <section class="text">
                    <h2>${data.location.name}</h2>
                    <h3>${currentData.day.maxtemp_c}<sup>o</sup>C</h3>
                  </section>
                  <figure class="mb-0 align-self-end">
                    <img src="${currentData.day.condition.icon}" class="w-100" alt="" />
                  </figure>
                </section>

                <section class="weather-behav">
                  <p>${currentData.day.condition.text}</p>
                </section>
                <ul class="icons px-2">
                  <li>
                    <img
                      src="./image/icon-umberella.png"
                      class="icon"
                      alt="icon-umberella"
                    />
                    <span>${currentData.day.avgtemp_c}%</span>
                  </li>
                  <li>
                    <img
                      src="./image/icon-wind.png"
                      class="icon"
                      alt="icon-umberella"
                    />
                    <span>${currentData.day.maxwind_kph}km/h</span>
                  </li>
                  <li>
                    <img
                      src="./image/icon-compass.png"
                      class="icon"
                      alt="icon-umberella"
                    />
                    <span>${data.current.wind_dir}</span>
                  </li>
                </ul>
              </section>
            </section>
          </section>
  
  
  `;
  row.innerHTML = current;
}

// display tomorrow and after tomorrow day===================================

function displayTomorrowDay(data) {
  // get tomorrowDay===============================
  let tomorrow = data.forecast.forecastday[1];
  let tomorrowDay = days[(date.getDay() + 1) % 7];
  // let afterTomorrowDay = days[(date.getDay() + 2) % 7];

  let weatherBox = `
            <section class="col p-0 special-col font">
            <section class="inner pb-3 h-100" id="tomorow-weather">
              <section
                class="head d-flex justify-content-center align-items-center px-3 py-2 mb-4"
              >
                <p class="m-0">${tomorrowDay}</p>
              </section>
              <section class="weather-body px-4">
                <section
                  class="degree d-flex align-items-center justify-content-center flex-column"
                >
                  <figure class="mb-0 sun">
                    <img
                      src="${tomorrow.day.condition.icon}"
                      class="w-100"
                      alt=""
                    />
                  </figure>
                  <section class="text text-center mb-2">
                    <h3 class="mb-1">
                     ${tomorrow.day.maxtemp_c}<sup>o</sup>C
                    </h3>
                    <p>${tomorrow.day.mintemp_c} <sup>o</sup></p>
                  </section>
                </section>

                <section class="weather-behav text-center">
                  <p class="text-capitalize">${tomorrow.day.condition.text}</p>
                </section>
              </section>
            </section>
          </section>
    
    `;

  addElement(weatherBox)
}

// after tomorrow day======================================================

function displayAfterTomorrowDay(data) {
  // get tomorrowDay===============================
  let afterTomorrow = data.forecast.forecastday[2];
  let afterTomorrowDay = days[(date.getDay() + 2) % 7];
  
  // display====================================================
  let weatherBox = `
            <section class="col p-0  font">
            <section class="inner pb-3 h-100" id="tomorow-weather">
              <section
                class="head d-flex justify-content-center align-items-center px-3 py-2 mb-4"
              >
                <p class="m-0">${afterTomorrowDay}</p>
              </section>
              <section class="weather-body px-4">
                <section
                  class="degree d-flex align-items-center justify-content-center flex-column"
                >
                  <figure class="mb-0 sun">
                    <img
                      src="${afterTomorrow.day.condition.icon}"
                      class="w-100"
                      alt=""
                    />
                  </figure>
                  <section class="text text-center mb-2">
                    <h3 class="mb-1">
                     ${afterTomorrow.day.maxtemp_c}<sup>o</sup>C
                    </h3>
                    <p>${afterTomorrow.day.mintemp_c} <sup>o</sup></p>
                  </section>
                </section>

                <section class="weather-behav text-center">
                  <p class="text-capitalize">${afterTomorrow.day.condition.text}</p>
                </section>
              </section>
            </section>
          </section>
    
    `;
  addElement(weatherBox)
}
// add element to the row=============================
function addElement(weatherBox){
  row.innerHTML += weatherBox;
}
// search =========================================

searchInput.addEventListener("input", () => {
  if (searchInput.value.length < 3) {
    return;
  }
  getApi(searchInput.value.trim());
});
