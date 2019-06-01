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
  return functions[type](dom)
}

module.exports = scrapper
