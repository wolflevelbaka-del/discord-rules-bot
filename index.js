const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Show server rules")
].map(cmd => cmd.toJSON());

client.once("ready", async () => {
  console.log("✅ Bot is online");

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log("✅ Slash command registered");
  } catch (err) {
    console.error(err);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "rules") {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("📜 Rules")
      .setDescription(
        "**1. Respect Everyone**\nBe respectful.\n\n" +
        "**2. Content Control**\nNo NSFW or illegal content.\n\n" +
        "**3. Language**\nNo racism or hate speech.\n\n" +
        "**4. Lastly**\nFollow Discord ToS."
      )
      .setFooter({ text: "Last updated: 31 July 2025" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

client.login(process.env.TOKEN);
