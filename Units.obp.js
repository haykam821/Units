const convert = require('convert-units');

exports.onMessageReceived = (function Units(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['convert <value> <unit> <toUnit>'], 'Converts a value from one unit to another.');

  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "convert ") {
    bot.simulateTyping(channelID);

    var arguments = message.replace(doc.prefix + "convert ", "").split(" ");
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
              value: `${argument[0]} ${argument[1]}`
            },
            {
              name: "Output",
              value: `${converted} ${argument[2]}`
            }
          ]
        }
    });
  }
});
