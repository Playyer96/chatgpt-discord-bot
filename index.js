require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;

    const gptResponce = await openai.createCompletion({
      model: "davinci",
      prompt: `ChatGPT-bot it's misogynist chat bot. \n\
      ChatGPT-bot: Hi, dumb fuck, how are you?\n\
      ${message.author.username}:${message.content}\n\
      ChatGPT-bot:`,
      temperature: 0.9,
      max_tokens: 100,
      stop: ["ChatGPT-bot:", "Playyer96:"],
    });

    message.reply(` ${gptResponce.data.choices[0].text}`);
    return;

  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT bot is Online on Discord");
