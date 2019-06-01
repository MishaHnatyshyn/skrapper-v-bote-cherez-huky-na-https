const Telegraf = require('telegraf');
const bot = new Telegraf('894715235:AAGLbrJlbspsgQFN30CdDLgI4ScWLUQg59s'); // Создаем нашего бота
bot.telegram.setWebhook(`https://webhook.site/47bb138c-0721-4921-9b27-6f60b1fbd360/bot894715235:AAGLbrJlbspsgQFN30CdDLgI4ScWLUQg59s`);

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