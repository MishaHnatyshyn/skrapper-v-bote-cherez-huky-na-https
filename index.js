const Telegraf = require('telegraf');
const bot = new Telegraf('894715235:AAGLbrJlbspsgQFN30CdDLgI4ScWLUQg59s'); // Создаем нашего бота
//bot.telegram.setWebhook(`https://webhook.site/47bb138c-0721-4921-9b27-6f60b1fbd360/bot894715235:AAGLbrJlbspsgQFN30CdDLgI4ScWLUQg59s`);
const scrapper = require('./scrapper');
const getGroupLinkByName = require('./getGroupLinkByName')

//ІП-72
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('Veeery funny'));
//bot.hears('ІП-72', (ctx) => ctx.reply(getGroupLinkByName()));//
// bot.use(async (ctx) => {
//   console.log(ctx.message.text);
//   //ctx.reply(ctx.message.text)
//   // const url = await getGroupLinkByName(ctx.message.text);
//   // console.log(url);
//   //const currDay = await scrapper('http://rozklad.kpi.ua' + url, 'day')
// 	const currDay = await scrapper('http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=bb920257-c159-4dba-b630-48485f153785', 'week')
// 	ctx.reply(JSON.stringify(currDay))
// });
bot.command('schedule',async (ctx) => {
	console.log(ctx.message.text+1);
	const currDay = await scrapper('http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=bb920257-c159-4dba-b630-48485f153785', 'full')
	ctx.reply(JSON.stringify(currDay))
});
bot.command('week',async (ctx) => {
	console.log(ctx.message.text+2);
	const currDay = await scrapper('http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=bb920257-c159-4dba-b630-48485f153785', 'week')
	ctx.reply(currDay)
});
bot.command('day',async (ctx) => {
	console.log(ctx.message.text+3);
	const currDay = await scrapper('http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=bb920257-c159-4dba-b630-48485f153785', 'day')
	ctx.reply(JSON.stringify(currDay))
});
bot.launch();