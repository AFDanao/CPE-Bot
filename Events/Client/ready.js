const { Client, ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  /**
   * 
   * @param {Client} client 
   */
  async execute(client) {
    console.log("This client is now ready");

    client.user.setPresence({
      status: "idle",
      activities: [{ name: "Out For Bugs" , type: ActivityType.Watching }]
    });

    loadCommands(client);
  }
}