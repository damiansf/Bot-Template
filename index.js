const Botkit = require("botkit");
const setupBotActions = require("./bot");

require("dotenv").config();

const controller = Botkit.slackbot({
  json_file_store: "./db_slackbutton_slash_command/",
  debug: false,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
  scopes: ["commands", "bot"]
});

controller
  .spawn({
    token: process.env.BOT_TOKEN
  })
  .startRTM();

controller.setupWebserver(process.env.PORT, (err, webserver) => {
  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
    if (err) {
      res.status(500).send(`ERROR: ${err}`);
    } else {
      res.send("Success!");
    }
  });
});

setupBotActions(controller);
