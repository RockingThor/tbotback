const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

console.log(process.env.BOT_TOKEN);

const bot = new Telegraf(process.env.BOT_TOKEN);

const WEB_APP_URL = "https://pepto.rohitnandi.xyz/";
// const WEB_APP_URL = "http://localhost:3000/";

bot.start((ctx) =>
  ctx.reply("Welcome to Pepto: Your 10 minuite electronics shop", {
    reply_markup: {
      keyboard: [[{ text: "Show Catalog", web_app: { url: WEB_APP_URL } }]],
    },
  })
);

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get("/close", (req, res) => {
  bot.command("tstatus", (ctx) => ctx.reply("User cancelled the transaction"));
  //   console.log("was here");
  res.send("Closed");
});

app.listen(3002, () => {
  console.log(`Server started at PORT: 3002`);
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
