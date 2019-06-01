const Telegraf = require('telegraf');
const bot = new Telegraf('894715235:AAGLbrJlbspsgQFN30CdDLgI4ScWLUQg59s'); // Создаем нашего бота
const request = require('request');


const getGroupLinkByName = (name) => {
	const options = {
		method: 'POST',
		url: 'http://rozklad.kpi.ua/Schedules/ScheduleGroupSelection.aspx',
		form: {
			// ctl00_ToolkitScriptManager_HiddenField: ";;AjaxControlToolkit, Version=3.5.60623.0, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e::834c499a-b613-438c-a778-d32ab4976134:22eca927:ce87be9:2d27a0fe:23389d96:77aedcab:1bd6c8d4:7b704157",
			// __VIEWSTATE: "/wEMDAwQAgAADgEMBQAMEAIAAA4BDAUDDBACAAAOAgwFBwwQAgwPAgEIQ3NzQ2xhc3MBD2J0biBidG4tcHJpbWFyeQEEXyFTQgUCAAAADAUNDBACAAAOAQwFAQwQAgAADgEMBQ0MEAIMDwEBBFRleHQBG9Cg0L7Qt9C60LvQsNC0INC30LDQvdGP0YLRjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9Q4oRyVFdpfaWmqd1+aam9uzRQ",
			__EVENTTARGET: "",
			__EVENTARGUMENT: "",
			ctl00$MainContent$ctl00$txtboxGroup: name,
			ctl00$MainContent$ctl00$btnShowSchedule: "Розклад занять",
			__EVENTVALIDATION: "/wEdAAEAAAD/////AQAAAAAAAAAPAQAAAAUAAAAIsA3rWl3AM+6E94I5Tu9cRJoVjv0LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGElYc85UWqfa7lFRA7jpjzEChym",
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

//ІП-72
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('Veeery funny'));
//bot.hears('ІП-72', (ctx) => ctx.reply(getGroupLinkByName()));//
bot.use((ctx) => {
	console.log(ctx.message.text)
	ctx.reply(ctx.message.text)
});
bot.command('schedule',(ctx) => ctx.reply());
bot.launch();