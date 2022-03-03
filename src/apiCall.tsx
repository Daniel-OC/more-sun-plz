const getSunriseAndSunset = () => {
  fetch('https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=2022-03-27&formatted=0')
  .then(response => response.json())
  .then(data => console.log(data.results))
}


export {getSunriseAndSunset};