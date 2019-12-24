const assert = require("assert");
const { BotMock, SlackApiMock } = require("botkit-mock");
const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware
} = require("botbuilder-adapter-slack");

const setupBotActions = require("./bot.js");

beforeAll(() => {
  const adapter = new SlackAdapter({
    clientSigningSecret: "secret",
    botToken: "token",
    debug: false
  });

  adapter.use(new SlackEventMiddleware());
  adapter.use(new SlackMessageTypeMiddleware());

  this.controller = new BotMock({
    adapter,
    disable_webserver: true
  });

  SlackApiMock.bindMockApi(this.controller);
  setupBotActions(this.controller);
});

describe("Bot Template Tests", () => {
  it("Should send the user a help message via direct messaging once the user types help", async () => {
    const message = await this.controller.usersInput([
      {
        user: "someUserId",
        channel: "someChannel",
        messages: [
          {
            text: "help",
            isAssertion: true
          }
        ]
      }
    ]);

    return assert.strictEqual(
      message.text,
      "This is a help message that I have sent to you via Direct Messaging"
    );
  });

  it("Should send the user a help message in the channel they are currently in, in response to the helpme slashcommand", async () => {
    const message = await this.controller.usersInput([
      {
        type: "slash_command",
        user: "someUserId",
        channel: "someChannel",
        messages: [
          {
            command: "/helpme",
            text: "",
            isAssertion: true
          }
        ]
      }
    ]);

    return assert.strictEqual(
      message.text,
      "This is a help message that I have sent to you via a message in a channel"
    );
  });

  //Really this will never happen, the only way it will happen is if the command is written in the slack API website but not implemented in code
  it("Should tell the user they have inputted a unknown command in response to the user entering a random command", async () => {
    const message = await this.controller.usersInput([
      {
        type: "slash_command",
        user: "someUserId",
        channel: "someChannel",
        messages: [
          {
            command: "/iamnotvalid",
            text: "",
            isAssertion: true
          }
        ]
      }
    ]);

    return assert.strictEqual(
      message.text,
      "Sorry, I did not recognize that command"
    );
  });
});
