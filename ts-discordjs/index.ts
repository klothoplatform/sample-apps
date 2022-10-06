
/**
 * @klotho::persist {
 *   id = "secret"
 *   secret = true
 * }
 */
import * as fs from "fs/promises"

import { Client, GatewayIntentBits, RESTPutAPIApplicationGuildCommandsResult, Routes, SlashCommandBuilder } from "discord.js"

interface discordConfig {
  token: string,
  clientId: string,
  guildId: string,
}

const config = async function() {
  return JSON.parse(await fs.readFile("discord_config.json", 'utf-8')) as discordConfig
}()

const client = async function() {
  const client = new Client({intents: [GatewayIntentBits.Guilds]})

  client.once('ready', () => console.info("Bot ready"))

  client.login((await config).token)

  return client
}()

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong1'),
].map(c => c.toJSON())

client.then(async c => {
  const cfg = await config
  try {
    const data = await c.rest.put(Routes.applicationGuildCommands(cfg.clientId, cfg.guildId), {body: commands}) as RESTPutAPIApplicationGuildCommandsResult
    console.info(`Successfully registered ${data.length} application commands.`)
  } catch (e) {
    console.error(e)
  }
})

client.then(async c => {
  c.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'ping') {
      console.info(`Replying to ${interaction.user.username}'s ping`)
      await interaction.reply('Pong!');
    }
  });
})
