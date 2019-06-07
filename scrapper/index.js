'use strict'

const jsdom = require("jsdom");
const request = require("request-promise");
const { JSDOM } = jsdom;
const {
  getNearestTableAncestor,
  parseCell,
  parseTable
} = require('./utils');

const weekDays = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П\'ятниця',
];

const getOneDaySubjects = (table, index) => {
  return table.map((row) => row[index])
}

const formScheduleFromTable = (table) => {
  return weekDays.map((weekDay, index) => ({
    [weekDay]: getOneDaySubjects(table, index)
  }))
}

const getDOM = async (url) => {
  const data = await request(url)
  const dom = new JSDOM(data);
  return dom
}

const getFullSchedule = (dom) => {
  const [firstWeekTable, secondWeekTable] = [...dom.window.document.querySelectorAll('table')]
  const firstWeek = parseTable(firstWeekTable)
  const secondWeek = parseTable(secondWeekTable)
  const firstWeekSchedule = formScheduleFromTable(firstWeek);
  const secondWeekSchedule = formScheduleFromTable(secondWeek);
  return { firstWeekSchedule, secondWeekSchedule }
};
const beautyfy = (arr) => {
	let str = ``;
	let count = 0
  for(let i in arr){
      for (let k in arr[i]) {
          if (weekDays.includes(k)) {
              count++;
              str += `\n\n**` + k.toUpperCase() + `**` + `\n`
              for (let m in arr[i][k]) {
                  for (let j in arr[i][k][m]) {
                      if (j === 'subject') {
                          str += `–––––––––––\n`
						  let l = 1 + parseInt(m);
						  console.log(l)
						  str += j.toUpperCase()+ ` `+ l + ` : ` + arr[i][k][m][j] + `\n`
                      }

                      if (arr[i][k][m][j]) {
                          str += j.toUpperCase() + ` : ` + arr[i][k][m][j] + `\n`
                      }
                  }
              }
          }
          
	  } if(!count){
		  for(let p in arr[i]){
			  console.log(p)
			  if(p === 'subject'){
				  str += `–––––––––––\n`
                  let l = 1 + parseInt(i);
				  console.log(l)
				  str += p.toUpperCase()+` `+ l + ` : ` + arr[i][p]+`\n`
			  }
			  else if(arr[i][p]){
				  str += p.toUpperCase() + ` : ` + arr[i][p]+`\n`
			  }
		  }
	  }
	
  }
  return str
}
const getCurrDaySchedule = (dom) => {
  const cells = [...dom.window.document.querySelectorAll('.day_backlight')].map(parseCell)
  return cells
}
const getCurrWeekSchedule = (dom) => {
  const currDayCell = dom.window.document.querySelector('.day_backlight')
  const currWeekTable = getNearestTableAncestor(currDayCell);
  const currWeek = parseTable(currWeekTable)
  const currWeekSchedule = formScheduleFromTable(currWeek)
  return currWeekSchedule;
}

const functions = {
  'day': getCurrDaySchedule,
  'week': getCurrWeekSchedule,
  'full': getFullSchedule,
}

const scrapper = async (url, type) => {
  const dom = await getDOM(url)
  return beautyfy(functions[type](dom))
}

module.exports = scrapper
