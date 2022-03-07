describe('Error user flows', () => {

  const todaysTestDate = new Date(Date.now()).toISOString().split('T')[0]

  const stubResponse = () => {
    return {
      results:{
        "sunrise":"2022-03-06T14:00:00+00:00",
        "sunset":"2022-03-07T02:03:11+00:00",
        "solar_noon":"2022-03-06T20:20:29+00:00",
        "day_length":41123,
        "civil_twilight_begin":"2022-03-06T14:08:39+00:00",
        "civil_twilight_end":"2022-03-07T02:32:19+00:00",
        "nautical_twilight_begin":"2022-03-06T13:33:01+00:00",
        "nautical_twilight_end":"2022-03-07T03:07:57+00:00",
        "astronomical_twilight_begin":"2022-03-06T12:57:00+00:00",
        "astronomical_twilight_end":"2022-03-07T03:43:59+00:00",
        }
      }
  }

  it('should have an error page for 500 errors', () => {
    cy.intercept('GET', `https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=${todaysTestDate}&formatted=0`, 
    {
      ok: false,
      statusCode: 500
    }
  )
      .visit('http://localhost:3000')
      .get('#go-sleep-id').type('23:00:00')
      .get('#wake-up-id').type('07:00:00')
      .get('#start-work-id').type('09:00:00')
      .get('#end-work-id').type('17:00:00')
      .get('.submit-hours').click()
      .get('.error-container').should('exist')
      .get('.error-message').should('have.text', '500 Error. Something went wrong. Please try again!')
  })

  it('should have an error page for links that don\'t exist', () => {
    cy.intercept('GET', `https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=${todaysTestDate}&formatted=0`, 
    {ok: true,
    statusCode: 200,
    body: stubResponse()
    })
    
    cy.visit('http://localhost:3000/fishtown')
    .get('.error-container').should('exist')
    .get('.error-message').should('have.text', 'Sorry this page doesn\'t seem to exist!')
    .get('.return-home-error-btn').click()
  })



})