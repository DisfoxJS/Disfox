# SlashService — disfox

In this example, we will cover everything about the **SlashService**.

If you haven't seen the documentation and examples for **Application**, they are available at:

```
examples/Application/
```

---

## 1. Initialization

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, SlashService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();
```

---

## 2. Service functions

### Extract a single module

```js
SlashService.extractFile('./filePath.js');
```

Extracts a module with a structure like:

```js
export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(interaction) {
        // Execute code
    }
}
```

If the structure is identical, the extractor will place the module into:

```
{
    valids: [],   // valid modules
    invalids: []  // invalid modules
}
```

Otherwise, the module will be added to the `invalids` array.

---

### Extract all modules from a directory

```js
SlashService.extractDir('./commandsPath'); // A directory with command modules
```

Extracts all JS module files.  
Just like `extractFile()`, the extractor organizes modules into:

```
{
    valids: [],   // valid modules
    invalids: []  // invalid modules
}
```

The expected module structure is always:

```js
export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(interaction) {
        // Execute code
    }
}
```

---

## 3. Example: Extracting **1 module** ready for SlashCommands

### File `./ping.js`

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
}
```

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, SlashService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();

const commands = await SlashService.extractFile('./ping.js');

await myBot.slashCommands.deploySlash(commands.valids);
await myBot.slashCommands.listen();
```

---

## 4. Example: Extracting **multiple modules** ready for SlashCommands

### File `commands/ping.js`

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
}
```

Assume there are also `commands/say.js` and `commands/notes.js` as valid slash command modules.

### index.js

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application, SlashService } from "disfox";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});

await myBot.connect();

const commands = await SlashService.extractDir('./commands');

await myBot.slashCommands.deploySlash(commands.valids);
await myBot.slashCommands.listen();
```

---

## Notes

If an **absolute directory path** or a file with an extension other than `.js` is passed to `SlashService.extractFile()`, the method will throw a **`DisfoxError`**.

This document covers the usage of **SlashService**.

---

## Next Example

Usage of the **EventService** is available at:

```
examples/EventService
```