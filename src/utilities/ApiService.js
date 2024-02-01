const GEO_API_URL = 'https://forecast9.p.rapidapi.com/';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '7844b21bf504ae87b812b8617316cf08';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '59b195a3abmsh62dc890166c95fep1e22b6jsna5edd6a1be45',
    'X-RapidAPI-Host': 'forecast9.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
