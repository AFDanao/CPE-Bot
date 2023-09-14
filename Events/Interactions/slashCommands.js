const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: 'This command is outdated!',
        ephemeral: true
      });
    
    if (command.developer && interaction.user.id !== "438222179952230402")
      return interaction.reply({
        content: "This command is only for the developer",
        ephemeral: true
      });

    if (interaction.options.getSubcommand(false)) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${interaction.options.getSubcommand()}`
      );
      if (!subCommandFile)
        return interaction.reply({
          content: "This Sub-Command is outdated!",
          ephemeral: true
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  }
}