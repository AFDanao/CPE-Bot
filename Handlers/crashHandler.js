const { EmbedBuilder, WebhookClient, Client } = require("discord.js");
const { AntiCrash } = require("../config.json");
const { inspect } = require("util");
const s = new WebhookClient({ url: AntiCrash });

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  client.on("error", (err) => {
    const ErrorEmbed = new EmbedBuilder()
      .setTitle("Error")
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setColor("Red")
      .setDescription(inspect(err, { depth: 0 }))
      .setTimestamp();
    return s.send({
      embeds: [ErrorEmbed],
    });
  });

  process.on("unhandledRejection", (reason, p) => {
    const unhandledRejectionEmbed = new EmbedBuilder()
      .setTitle("**🔴 Unhandled Rejection/Catch 🔴**")
      .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
      .setColor("Red")
      .addFields(
        {
          name: "Reason",
          value: inspect(reason, { depth: 0 }).substring(0, 1000),
        },
        { name: "Promise", value: inspect(p, { depth: 0 }).substring(0, 1000) }
      )
      .setTimestamp();
    return s.send({
      embeds: [unhandledRejectionEmbed],
    });
  });

  process.on("uncaughtException", (err, origin) => {
    const uncaughtExceptionEmbed = new EmbedBuilder()
      .setTitle("**🔴 Uncaught Exception/Crash 🔴**")
      .setColor("Red")
      .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
      .addFields(
        { name: "Error", value: inspect(err, { depth: 0 }).substring(0, 1000) },
        {
          name: "Origin",
          value: inspect(origin, { depth: 0 }).substring(0, 1000),
        }
      )
      .setTimestamp();
    return s.send({
      embeds: [uncaughtExceptionEmbed],
    });
  });

  process.on("multipleResolves", (type, promise, reason) => {
    // if (
    //   reason.toLocateString() ===
    //   "Error: Cannot perform IP discovery - socket closed"
    // )
    //   return;
    const multipleResolvesEmbed = new EmbedBuilder()
      .setTitle("**🔴 Multiple Resolves 🔴**")
      .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
      .setColor("Red")
      .addFields(
        { name: "Type", value: inspect(type, { depth: 0 }).substring(0, 1000) },
        {
          name: "Promise",
          value: inspect(promise, { depth: 0 }).substring(0, 1000),
        },
        {
          name: "Reason",
          value: inspect(reason, { depth: 0 }).substring(0, 1000),
        }
      )
      .setTimestamp();
    return s.send({
      embeds: [multipleResolvesEmbed],
    });
  });

  process.on("warning", (warn) => {
    const warningEmbed = new EmbedBuilder()
      .setTitle("**🔴 Warning 🔴**")
      .setColor("Red")
      .setURL("https://nodejs.org/api/process.html#event-warning")
      .addFields({
        name: "Warn",
        value: inspect(warn, { depth: 0 }).substring(0, 1000),
      })
      .setTimestamp();
    return s.send({
      embeds: [warningEmbed],
    });
  });
};
