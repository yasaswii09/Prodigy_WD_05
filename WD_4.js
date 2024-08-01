const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const location = document.getElementById('location').value;
  getWeatherData(location);
});

function getWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('weatherData').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    });
}

function displayWeatherData(data) {
  if (data.cod !== 200) {
    document.getElementById('weatherData').innerHTML = `<p>${data.message}</p>`;
    return;
  }

  const weatherDataDiv = document.getElementById('weatherData');
  weatherDataDiv.innerHTML = `
    <div>Location: ${data.name}, ${data.sys.country}</div>
    <div>Temperature: ${data.main.temp}°C</div>
    <div>Weather: ${data.weather[0].description}</div>
    <div>Humidity: ${data.main.humidity}%</div>
    <div>Wind Speed: ${data.wind.speed} m/s</div>
  `;
}

// Optional: Get weather data based on user's current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  });
}
