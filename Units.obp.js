const convert = require('convert-units');

exports.onMessageReceived = (function Units(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['convert <value> <unit> <toUnit>'], 'Converts a value from one unit to another.');

  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "convert")) {
    bot.simulateTyping(channelID);

    var arguments = message.replace(doc.prefix + "convert ", "").split(" ");

    if (isNaN(parseInt(arguments[0]))) {
      // some handling for your number not being a number and you're a complete idiot
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Not a Number",
          color: 0xdd2e44,
          timestamp: new Date(),
          description: ":x: Your value is not a number."
        }
      });
    } else if (arguments.length < 3) {
      // some handling for missing arguments
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Missing Arguments",
          color: 0xdd2e44,
          timestamp: new Date(),
          description: ":x: You are missing arguments. You should have the amount, the unit the amount's in, and what unit you want to convert to."
        }
      });
    } else if (arguments.length > 3) {
      // some handling for TOO MANY arguments
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Too Many Arguments",
          color: 0xdd2e44,
          timestamp: new Date(),
          description: ":x: You have too many arguments. You should only have three."
        }
      });
    } else {
      try {
        var converted = convert(arguments[0]).from(arguments[1]).to(arguments[2]);

        bot.sendMessage({
          to: channelID,
            embed: {
              title: "Converted",
              color: 0x77b255,
              timestamp: new Date(),
              description: ":white_check_mark: The value was succesfully converted.",
              fields: [
                {
                  name: "Input",
                  value: `${arguments[0]} ${arguments[1]}`
                },
                {
                  name: "Output",
                  value: `${converted} ${arguments[2]}`
                }
              ]
            }
        });
      } catch (e) {
        if (e.message.startsWith('Unsupported unit')) {
          bot.sendMessage({
            to: event.d.channel_id,
            embed: {
              title: "Unsupported Unit",
              color: 0xdd2e44,
              timestamp: new Date(),
              description: ":x: A unit you gave is unsupported. Try its shorthand."
            }
          });
        } else {
          console.log('Error while converting units', error);
          bot.sendMessage({
              to: channelID,
              embed: {
                title: 'Unknown Error',
                color: 0xdd2e44,
                timestamp: new Date(),
                description: ":x: An unknown error has occurred! If this doesn't work the next time, please contact the bot owner."
              }
          });
        }
      }
    }
  }
});
