# Websocket Sample using Discord.js
Create the [discord.js sample app](https://discordjs.guide/creating-your-bot) deployable by Klotho.

## Pre-requisites
1. https://discordjs.guide/preparations/setting-up-a-bot-application.html
  - Save the Token and Application Id in `discord_config.json`

2. https://discordjs.guide/preparations/adding-your-bot-to-servers.html
  - Save the `guildId` in `discord_config.json`

## Config
The `discord_config.json` should look like:

```json
{
  "token": "<token>",
  "clientId": "<application id>",
  "guildId": "<guild id>"
}
```

## Run locally
```bash
ts-node index.ts
```

## Klotho compile
A [configuration file](./klotho.yaml) is provided to use Fargate for execution units to provide an always-on bot.
```bash
klotho -c klotho.yaml
```
After compilation, copy your discord config to allow the IaC to upload it as a secret:
```bash
cp discord_config.json compiled/
```
