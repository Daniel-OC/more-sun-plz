const getSunriseAndSunset = (date: string) => {
  return fetch(`https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=${date}&formatted=0`)
  .then(response => response.json())
  .then(data => data.results)
}


export {getSunriseAndSunset};