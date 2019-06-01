'use strict';
const scrapper = require('./index')

const url = 'http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=bb920257-c159-4dba-b630-48485f153785';

(async () => {
  console.log('start')
  console.log('currDay\n\n');
  const currDay = await scrapper(url, 'day')
  console.log(currDay)
  console.log('\n\n************************************************\n\n');
  console.log('currWeek\n\n');
  const currWeek = await scrapper(url, 'week')
  console.log(currWeek)
  console.log('\n\n************************************************\n\n');
  console.log('full\n\n');
  const full = await scrapper(url, 'full')
  console.log(full)
  console.log('\n\n************************************************\n\n');
})()
