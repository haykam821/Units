const convert = require('convert-units');

exports.onMessageReceived = (function Units(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['convert <value> <unit> <toUnit>'], 'Converts a value from one unit to another.');

  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "convert")) {
    bot.simulateTyping(channelID);

    var arguments = message.replace(doc.prefix + "convert ", "").split(" ");

    if (arguments.length < 3) {
      // some handling for missing arguments
    } else if (arguments.length > 3) {
      // some handling for TOO MANY arguments
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
        }
      }
    }
  }
});
