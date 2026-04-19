<p align="center">
  <a href="https://disfox.netlify.app">
  <img src="https://raw.githubusercontent.com/DisfoxJS/Disfox-assets/main/dfx.npm.png" width="500" />
  </a>
</p>

<p align="center">
  <strong>Build Discord apps faster, cleaner, and smarter.</strong>
</p>

<p align="center">
  <a href="https://discord.gg/UuZnAuhhP6">
    <img src="https://img.shields.io/badge/Community-Discord?logo=discord&style=for-the-badge&labelColor=0D1117&color=5865F2">
  </a>
</p>

**Disfox** is a **framework** that enhances and organizes **discord.js** development, making building Discord applications faster, cleaner, and more structured.

**Examples and documentation available in [Official Documentation Site](https://disfox.netlify.app)**  


### Install

`npm install disfox`
`yarn add disfox`
`pnpm add disfox`
`bun add disfox`

### Key Features

- **Result Pattern** for consistent and predictable handling  
- Centralized **Client** and **Application** management  
- Simplified **path** and **directory** handling  
- Simplified **file system** utilities  
- Dedicated **Slash Command** service  
- Scalable and flexible **configuration system**

## Compatibility

Disfox is currently **not compatible with CommonJS**.

Only ES Modules (ESM) are supported.

### Example usage

```js
import { Client, GatewayIntentBits, ActivityType, Events } from "discord.js";
import { Application, SlashService } from "disfox";

const client = new Client({
  intents: [GatewayIntentBits.MessageContent]
});

const app = new Application({
  token: process.env.TOKEN,
  client: client
});

await app.connect();

await app.actions.setPresence(
  ActivityType.Playing,
  "⭐ Ready! /help",
  "online"
);

app.client.on(Events.ClientReady, async () => {
  // convert Disfox model to Discord.js SlashCommand structure
  const command = await SlashService.convertsFile("./commands/ping.js");

  // deploy globally
  await app.slash.deployGlobal([command]);

  // listen for interactions
  app.slash.listen({
    onError: {
      message: "Error occurred. Try again later.",
      flags: 64
    }
  });
});

```

### Status
The framework is still **under development**. All suggestions and ideas are very welcome.

### Community Server
Join our Discord for support, questions, and suggestions:  
https://discord.gg/UuZnAuhhP6

### Disfox

- [Official Documentation Site](https://disfox.netlify.app)
- [NPM Package](https://www.npmjs.com/package/disfox)
- [Github Repository](https://github.com/DisfoxJS/Disfox)
- [Github Wiki](https://github.com/DisfoxJS/Disfox/wiki/What-is-Disfox%3F)
- [Discord Community Server](https://discord.gg/UuZnAuhhP6)
