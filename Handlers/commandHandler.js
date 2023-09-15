async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  console.time("Commands Loaded");
  // const ascii = require("ascii-table");
  // const table = new ascii("Commands").setHeading("Name", "Status");

  await client.commands.clear();
  await client.subCommands.clear();

  const commands = new Array();

  let commandsArray = [];

  const files = await loadFiles("Commands");

  files.forEach((file) => {
    try {
      const command = require(file);

      if (command.subCommand)
        return client.subCommands.set(command.subCommand, command);
      
      client.commands.set(command.data.name, command);

      commandsArray.push(command.data.toJSON());

      commands.push({ Command: command.data.name, Status: "🟩" });
    } catch (error) {
      commands.push({ Command: file.split("/").pop().slice(0, -3), Status: "🟥" });
    }
  });
  client.application.commands.set(commandsArray);

  console.table(commands, ["Command", "Status"]);
  console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands");
  console.timeEnd("Commands Loaded");
}

module.exports = { loadCommands };