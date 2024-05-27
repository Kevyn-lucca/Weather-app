// Variável que indica se a temperatura está em Celsius ou Fahrenheit
let usingC = true;

// Variável para armazenar o valor do país
let currentCountry = "default";

// Seleciona os botões de Celsius e Fahrenheit
const Cbtn = document.querySelector("#CelsiusButton");
const Fbtn = document.querySelector("#FarenheitButton");

// Seleciona o formulário e o campo de entrada
const form = document.querySelector("form");
const input = document.querySelector("input");

// Adiciona um evento de clique ao botão Celsius
Cbtn.addEventListener("click", () => {
  // Define a variável para usar Celsius
  usingC = true;
  // Adiciona a classe "Blue" ao botão Celsius e remove do botão Fahrenheit
  Cbtn.classList.add("Blue");
  Fbtn.classList.remove("Blue");
  // Obtém o clima com a nova configuração
  GetWeather(currentCountry);
});

// Adiciona um evento de clique ao botão Fahrenheit
Fbtn.addEventListener("click", () => {
  // Define a variável para usar Fahrenheit
  usingC = false;
  // Adiciona a classe "Blue" ao botão Fahrenheit e remove do botão Celsius
  Cbtn.classList.remove("Blue");
  Fbtn.classList.add("Blue");
  // Obtém o clima com a nova configuração
  GetWeather(currentCountry);
});

// Adiciona um evento de submissão ao formulário
form.addEventListener("submit", (e) => {
  // Previna o comportamento padrão do formulário (recarregar a página)
  e.preventDefault();
  // Obtém o valor do campo de entrada
  currentCountry = input.value;
  // Obtém o clima para o país inserido
  GetWeather(currentCountry);
});

// Função assíncrona que obtém os dados do clima
async function GetWeather(country) {
  // Faz uma requisição à API de clima com o país fornecido
  const WeatherResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ece09bec73a74ca391d224224242205&q=${country}&days=6&aqi=no&alerts=no`,
    { mode: "cors" }
  );
  // Converte a resposta em JSON
  const WeatherData = await WeatherResponse.json();
  // Define os dados no DOM
  SetData(WeatherData);
}

// Função que define os dados no DOM
function SetData(WeatherData) {
  // Seleciona os elementos do DOM
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

  // Define o texto sob a temperatura principal
  UnderMain.textContent = WeatherData.current.condition.text;

  // Define a data e a hora
  Maindate.textContent = WeatherData.current.last_updated.slice(2, -5);
  MainHour.textContent = WeatherData.current.last_updated.slice(-5);

  // Define o nome do país
  CountryName.textContent = WeatherData.location.country;

  // Define os dados dos itens de previsão
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

// Obtém o clima para o valor padrão ao carregar a página
GetWeather(currentCountry);
