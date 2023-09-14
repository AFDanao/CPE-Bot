const { ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Enter your information for profile set up")
    .addStringOption((options) => options
      .setName("name")
      .setDescription("Enter your name")
      .setRequired(true)
    )
    .addStringOption((options) => options
      .setName("year")
      .setDescription("Select your year level")
      .setRequired(true)
      .addChoices(
        { name: "1st Year", value: "1st Year" },
        { name: "2nd Year", value: "2nd Year" },
        { name: "3rd Year", value: "3rd Year" },
        { name: "4th Year", value: "4th Year" },
      )
    ),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const year = interaction.options.getString("year");

    switch (year) {
      case "1st Year" : 
        interaction.member.roles.add("1151739492898717787");
        break;
      case "2nd Year" :
        interaction.member.roles.add("1151739636322947072");
        break;
      case "3rd Year" :
        interaction.member.roles.add("1151739685450821682");
        break;
      case "4th Year" :
        interaction.member.roles.add("1151739983602913301");
        break;
    }

    await interaction.member.setNickname(`${name} - ${year}`);
    await interaction.reply({ content: "Nickname Changed", ephemeral: true });
  }
}