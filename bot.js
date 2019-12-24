/*
  Handles slash commands
*/
function setupBotActions(controller) {
  controller.hears("help", "direct_message", (bot, message) => {
    bot.reply(
      message,
      "This is a help message that I have sent to you via Direct Messaging"
    );
  });

  controller.on("slash_command", (bot, message) => {
    bot.replyAcknowledge && bot.replyAcknowledge();
    switch (message.command) {
      case "/helpme":
        bot.reply(
          message,
          "This is a help message that I have sent to you via a message in a channel"
        );
        if (controller.storage.users) {
          controller.storage.users.get(message.user, (error, response) => {
            if (response !== undefined) {
              bot.api.users.info({ user: message.user }, (error, response) => {
                controller.storage.users.delete(message.user);
              });
            }
          });
          controller.storage.users.save({
            id: message.user
          });
        }
        break;
      default:
        //Really this will never happen, the only way it will happen is if the command is written in the slack API website but not implemented in code
        bot.reply(message, "Sorry, I did not recognize that command");
    }
  });
}

module.exports = setupBotActions;
