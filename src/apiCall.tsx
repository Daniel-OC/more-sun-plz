const checkForError = (response: Response) => {
  if (response.ok) {
    return response.json()
  } else if ((!response.ok && response.status >= 400) && response.status < 500) {
    throw (`${response.status} Error. Sorry, the page you're looking for doesn't exist.`)
  } else if (!response.ok && response.status >= 500) {
    throw (`${response.status} Error. Something went wrong. Please try again!`)
  } else if (!response.ok){
    throw (`${response.status} Error. Something went wrong! We're not sure either, sorry!!`)
  }
}

const getSunriseAndSunset = (date: string) => {
  return fetch(`https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=${date}&formatted=0`)
  .then(response => checkForError(response))
  .then(data => data.results)
}


export {getSunriseAndSunset};