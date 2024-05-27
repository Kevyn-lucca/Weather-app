async function GetWeather() {
  const WeatherResponse = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=ece09bec73a74ca391d224224242205&q=brasil&days=6&aqi=no&alerts=no",
    { mode: "cors" }
  );
  const WeatherData = await WeatherResponse.json();
  PutData(WeatherData);
}

function PutData(WeatherData) {
  const MainImg = document.querySelector("#MainImg");
  const MainTxt = document.querySelector("#Temperature");
  const UnderMain = document.querySelector("#TemperatureUnder");
  const Maindate = document.querySelector("#Date");
  const MainHour = document.querySelector("#Hour");
  const CountryName = document.querySelector("#CountryName");
  const itensImg = document.querySelectorAll(".TempItens");
  const itensTextUpper = document.querySelectorAll(".ItemState");
  const itensTextUnder = document.querySelectorAll(".UnderText");
  const Cbtn = document.querySelector("#");
  const Fbtn = document.querySelector("#");

  Cbtn.addEventListener("click", () => {
    console.log("Cfunciona");
  });

  Cbtn.addEventListener("click", () => {});

  MainImg.src = WeatherData.current.condition.icon;
  MainTxt.textContent = WeatherData.current.feelslike_c + "° c";
  UnderMain.textContent = WeatherData.current.condition.text;
  Maindate.textContent = WeatherData.current.last_updated.slice(2, -5);
  MainHour.textContent = WeatherData.current.last_updated.slice(-5);
  CountryName.textContent = WeatherData.location.country;

  for (i = 0; i < 6; i++) {
    itensImg[i].src = WeatherData.forecast.forecastday[i].day.condition.icon;
    itensTextUpper[i].textContent =
      "Day " + WeatherData.forecast.forecastday[i].date.slice(8);
    itensTextUnder[i].textContent =
      WeatherData.forecast.forecastday[i].day.avgtemp_c + "° c";
  }

  /*itensImg.forEach((iten, index) => {
    console.log(itensText);
    
  });
   itensText.forEach((itenText) => {x
  });*/
}

GetWeather();
