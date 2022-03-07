# More Sun, Plz!

## Table of Contents
- [Overview](#overview)
- [Deployed-site](#deployed-site)
- [Screenshots](#screenshots)
- [Learning-Goal](#learning-goal)
- [Individual-Reflection](#individual-reflection)
- [Links](#links)
- [Creator-Links](#creator-links)
- [Technologies](#technologies)

## Overview
This was a solo project for Mod 3 students at the Turing School of Software to prove that they had gained a solid understanding of React, Cypress, Router, and deploying apps. I also chose to use TypeScript to further cement the concepts of using a strongly typed language.

For the project we got to decide our own goals.

My initial goal was to calculate how many hours of sunlight a user gets to experience in a year while awake and not at work. The user would then be able to calculate how many hours of sunlight they would have if there was no Daylight Savings Time, and how many hours of sunlight they would have if we permanently shifted to Daylight Savings Time(DST).

However, after spending the first three days of this project trying to sort that logic out, I realized I was going to be shooting myself in the foot if I used the remaining 48 hours trying to make that happen.

I pivoted to a smaller goal: How does DST affect you for one day? In the longterm I hope to solve the logic of a full year. Many of us have strong opinions on DST, but I suspect very few of us actually know the impact it has on our life.

The final product allows a user to enter their average time of going to bed and waking up, as well as the time they start and leave work.

Assuming that they work dayshift(have yet to figure out the logic of night shift, just yet), the internal logic of the app shows the user how many hours of sunlight they got to experience, and how that would change w/ or w/o DST.

Currently the app assumes that the user lives in Seattle, WA. Another longterm goal would be to set it up in such a way that allows you to enter your location, even accounting for states that don't use DST.


## Deployed site
[Click Here To see the Site](https://more-sun-plz.herokuapp.com/)


## Screenshots 
![](https://media.giphy.com/media/GiefrTYK4H3bZenb6B/giphy.gif)
Upon load, the user can enter what time they go to sleep, wake up, start work, and end work

![](https://media.giphy.com/media/JcHwbFFu6Ai6jbFNB9/giphy.gif)
After entering values for all four categories, a button appears, allowing them to submit their hours, and receive a "time-report".

![](https://media.giphy.com/media/L3kgXL6oC1aO1oE1fm/giphy.gif)
By default, the page will auto-load "Standard Time", what time would look like under "Standard Time". However, the user can click "Compare to DST" and receive a new report that shows how their day would have looked if it was instead in DST.

![](https://media.giphy.com/media/f1T404lKMFbm6rgPO0/giphy.gif)
From these pages, the user can go home and enter new values to see how different sleep and work times would be affected by DST!


## Learning Goal
My chief learning goals in this undertaking were:
- Solidify my understanding of TypeScript
- Reinforce all of the other skills I had picked up over the course of Mod 3: React, Router, Cypress, and deploying Apps, 

## Links 
[Repo](https://github.com/Daniel-OC/more-sun-plz)
[Deployed Link](https://more-sun-plz.herokuapp.com/)

## Creator Links
[GitHub](https://github.com/Daniel-OC)
[LinkedIn](https://www.linkedin.com/in/daniel-o-connell-maker/)


## Technologies 
- TypeScript 
- JavaScript
- React
- React Router
- Sass
- Fetch API 
- Cypress 
- Heroku 