let usingC = true;
// Variável para armazenar o valor do país
let currentCountry = "default";
// Seleciona elementos globais do dom
const Cbtn = document.querySelector("#CelsiusButton");
const Fbtn = document.querySelector("#FarenheitButton");
const form = document.querySelector("form");
const input = document.querySelector("input");

// Eventos dos buttons
Cbtn.addEventListener("click", () => {
  usingC = true;
  Cbtn.classList.add("Blue");
  Fbtn.classList.remove("Blue");
  GetWeather(currentCountry);
});

Fbtn.addEventListener("click", () => {
  usingC = false;
  Cbtn.classList.remove("Blue");
  Fbtn.classList.add("Blue");
  GetWeather(currentCountry);
});

// Adiciona um evento de submissão ao formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentCountry = input.value;
  // Obtém o clima para o país inserido
  GetWeather(currentCountry);
});

// Função assíncrona que obtém os dados do clima
async function GetWeather(country) {
  const WeatherResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ece09bec73a74ca391d224224242205&q=${country}&days=6&aqi=no&alerts=no`,
    { mode: "cors" }
  );
  const WeatherData = await WeatherResponse.json();
  SetData(WeatherData);
}

// Função que define os dados no DOM
function SetData(WeatherData) {
  // Seleciona os elementos do DOM que serão usados pela função
  const MainImg = document.querySelector("#MainImg");
  const MainTxt = document.querySelector("#Temperature");
  const UnderMain = document.querySelector("#TemperatureUnder");
  const Maindate = document.querySelector("#Date");
  const MainHour = document.querySelector("#Hour");
  const CountryName = document.querySelector("#CountryName");
  const itensImg = document.querySelectorAll(".TempItens");
  const itensTextUpper = document.querySelectorAll(".ItemState");
  const itensTextUnder = document.querySelectorAll(".UnderText");

  // Define a imagem e a temperatura principal
  MainImg.src = WeatherData.current.condition.icon;
  if (usingC == true) {
    MainTxt.textContent = WeatherData.current.feelslike_c + "° c";
  } else {
    MainTxt.textContent = WeatherData.current.feelslike_f + "° f";
  }
  UnderMain.textContent = WeatherData.current.condition.text;
  Maindate.textContent = WeatherData.current.last_updated.slice(2, -5);
  MainHour.textContent = WeatherData.current.last_updated.slice(-5);
  CountryName.textContent = WeatherData.location.country;

  for (let i = 0; i < 6; i++) {
    itensImg[i].src = WeatherData.forecast.forecastday[i].day.condition.icon;
    itensTextUpper[i].textContent =
      "Day " + WeatherData.forecast.forecastday[i].date.slice(8);
    if (usingC == true) {
      itensTextUnder[i].textContent =
        WeatherData.forecast.forecastday[i].day.avgtemp_c + "° c";
    } else {
      itensTextUnder[i].textContent =
        WeatherData.forecast.forecastday[i].day.avgtemp_f + "° f";
    }
  }
}

GetWeather(currentCountry);
