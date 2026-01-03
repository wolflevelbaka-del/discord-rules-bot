const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Show server rules"),
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔁 Registering slash commands...");

    await rest.put(
      Routes.applicationCommands("1457057664692650056"),
      { body: commands }
    );

    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error(error);
  }
})();
