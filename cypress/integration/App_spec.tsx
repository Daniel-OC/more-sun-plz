/// <reference types="cypress" />
describe('App User Flows', () => {

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
  const todaysTestDate = new Date(Date.now()).toISOString().split('T')[0]
  
  it('should show the user their input boxes upon load', () => {
    cy.intercept('GET', `https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&date=${todaysTestDate}&formatted=0`, 
   {ok: true,
    statusCode: 200,
    body: stubResponse()
   })

    cy.visit('http://localhost:3000')
      .get('h2').should('have.text', 'How Does Daylight Savings Affect Me?')
      .get('h3').should('have.text', 'What time do you go to bed?What time do you wake up?What time do you start work?What time does work end?')
      .get('.submit-hours').should('not.exist')
      .get('#go-sleep-id').type('23:00:00')
      .get('#wake-up-id').type('07:00:00')
      .get('#start-work-id').type('09:00:00')
      .get('#end-work-id').type('17:00:00')
      .get('.submit-hours').click()
      .get('.home-button').should('exist')
      .get('.result-header').should('exist')
      .get('.result-info-1').should('exist')
      .get('.result-info-2').should('exist')
      .get('.to-standard-button').should('not.exist')
      .get('.to-dst-button').click()
      .get('.result-header').should('exist')
      .get('.result-info-1').should('exist')
      .get('.result-info-2').should('exist')
      .get('.home-button').click()
      .get('h2').should('have.text', 'How Does Daylight Savings Affect Me?')
      .get('h3').should('have.text', 'What time do you go to bed?What time do you wake up?What time do you start work?What time does work end?')
      .get('.submit-hours').should('exist')
      .get('#go-sleep-id').type('23:00:00')
      .get('#go-sleep-id').should('have.value', '23:00:00')
      .get('#wake-up-id').type('07:00:00')
      .get('#start-work-id').type('09:00:00')
      .get('#end-work-id').type('17:00:00')  
  })
})