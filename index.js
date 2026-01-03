const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("✅ Bot ist online");
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
        "**3. Language**\nNo hate speech.\n\n" +
        "**9. Lastly**\nFollow Discord ToS."
      )
      .setFooter({ text: "Last updated: 31 July 2025" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

client.login(process.env.TOKEN);

