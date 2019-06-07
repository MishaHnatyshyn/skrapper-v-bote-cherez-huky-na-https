const request = require('request');


const getGroupLinkByName = (name) => {
  const options = {
    method: 'POST',
      headers: {
	Host: "rozklad.kpi.ua",
	Connection: "keep-alive",
	"Content-Length": "1319",
	"Cache-Control": "max-age=0",
	Origin: "http://rozklad.kpi.ua",
		"Upgrade-Insecure-Requests": 1,
	"Content-Type": "application/x-www-form-urlencoded",
	Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"

      },
    url: 'http://rozklad.kpi.ua/Schedules/ScheduleGroupSelection.aspx',
    form: {
      // ctl00_ToolkitScriptManager_HiddenField: ";;AjaxControlToolkit, Version=3.5.60623.0, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e::834c499a-b613-438c-a778-d32ab4976134:22eca927:ce87be9:2d27a0fe:23389d96:77aedcab:1bd6c8d4:7b704157",
      // __VIEWSTATE: "/wEMDAwQAgAADgEMBQAMEAIAAA4BDAUDDBACAAAOAgwFBwwQAgwPAgEIQ3NzQ2xhc3MBD2J0biBidG4tcHJpbWFyeQEEXyFTQgUCAAAADAUNDBACAAAOAQwFAQwQAgAADgEMBQ0MEAIMDwEBBFRleHQBG9Cg0L7Qt9C60LvQsNC0INC30LDQvdGP0YLRjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9Q4oRyVFdpfaWmqd1+aam9uzRQ",
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      ctl00$MainContent$ctl00$txtboxGroup: name,
      ctl00$MainContent$ctl00$btnShowSchedule: "Розклад занять",
      __EVENTVALIDATION: "/wEdAAEAAAD/////AQAAAAAAAAAPAQAAAAUAAAAIsA3rWl3AM+6E94I5Tu9cRJoVjv0LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGElYc85UWqfa7lFRA7jpjzEChym",
		hiddenInputToUpdateATBuffer_CommonToolkitScripts: 1
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, response = {}) => {
      if (err) {
        return reject(err)
      }
      resolve((response.headers || {}).location);
    });
  })
};

module.exports = getGroupLinkByName;