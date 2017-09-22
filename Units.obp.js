const convert = require('convert-units');

exports.onMessageReceived = (function Units(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['convert <value> <unit> <toUnit>'], 'Converts a value from one unit to another.');

  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "convert ") {
  }
});
