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

function parseDetails(element, e) {
	let str =``;
      if (e === 'subject') {
          str += `–––––––––––\n`;
          str += e.toUpperCase() + ` ` + ` : ` + element[e] + `\n`
      }
      else if (e) {
          str += e.toUpperCase() + ` : ` + element[e] + `\n`
      }
	return str;
}


function parseDay(elem, el) {
  let str =``;
	elem[el].forEach((element) => {
		Object.keys(element || {}).forEach((e) => {
		  str += parseDetails(element, e);
		})
	});
    return str;
}

const beautyfy = (arr) => {
	let str = ``;
	arr.forEach((elem) => {
		Object.keys(elem).forEach((el) => {
			if (weekDays.includes(el)) {
				str += `\n\n**` + el.toUpperCase() + `**` + `\n`
				str += parseDay(elem, el);
			}
		})


		// if(!count){
	// 	  for(let p in arr[i]){
	// 	      console.log(p)
	// 	      if(p === 'subject'){
	// 	          str += `–––––––––––\n`
	// 	            let l = 1 + parseInt(i);
	// 	          console.log(l)
	// 	          str += p.toUpperCase()+` `+ l + ` : ` + arr[i][p]+`\n`
	// 	      }
	// 	      else if(arr[i][p]){
	// 	          str += p.toUpperCase() + ` : ` + arr[i][p]+`\n`
	// 	      }
	// 	  }
	// 		str += parseDay();
	//   }
    });
  return str;
};
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
