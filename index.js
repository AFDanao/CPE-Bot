const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildPresences, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildPresences, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();
client.guildConfig = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);
require("./Handlers/crashHandler")(client);

client.login(client.config.Token);