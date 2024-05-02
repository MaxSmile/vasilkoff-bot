// app/api/telegram/route.js

import { Telegraf } from 'telegraf';

// Initialize the bot with your Telegram Bot Token
const bot = new Telegraf('6362952851:AAE4bI3KADUkVo-n40Pd7CcpqIpeIOWUf_w');

// Middleware to log incoming messages to console
bot.use((ctx, next) => {
  console.log(`Received message: ${ctx.message.text}`);
  next();
});

// Echo back any text messages
bot.on('text', (ctx) => {
  ctx.reply(ctx.message.text);
});

// Export the POST function to handle incoming webhook payloads
module.exports = async function POST(request) {
  try {
    const body = await request.text();
    // Process the webhook payload
    // For now, let's just log the payload
    console.log('Webhook payload:', body);
    return new Response('Success!', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
};
