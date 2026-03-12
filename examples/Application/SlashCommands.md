#2

# Application SlashCommands — disfox

In this example, we will cover everything about the **SlashCommands** field of the `Application` class.

If you haven't seen the detailed example on how to create an `Application` instance, check:

```
./creatingApp.js
examples/Application/creatingApp.md
```

---

## 1. Required Imports (discord.js)

```js
import { Client, GatewayIntentBits } from "discord.js";
```

---

## 2. Required Imports (disfox)

```js
import { Application } from "disfox";
```

---

## 3. Creating the client with discord.js

```js
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
```

---

## 4. Creating the Application instance

```js
const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});
```

---

## 5. Registering global / guild commands

### Registering global commands

```js
myBot.slashCommands.deployGlobal(["array_of_commands"]);
```

Here we are registering **global commands** in Discord.  
The method receives an **array containing all the commands of your application**.

---

### Registering commands in specific guilds

```js
myBot.slashCommands.deployGuilds(
    ["array_of_commands"],
    ["array_of_guild_ids"]
);
```

In this case, the commands will be registered **only in the specified guilds**.

---

## 6. Logging in the application

> Always log in **before listening to commands**.

```js
await myBot.connect();
```

---

## 7. Listening to Slash interactions

```js
myBot.slashCommands.listen();
```

Now the application starts **listening to slash commands** and will execute the `execute` function.

Since **no parameters are passed** to `listen()`, the default behavior of **disfox** will be used when an error occurs.

Default message:

```
An error occurred while executing this command. Please try again later.
```

---

## Customizing error behavior

You can define:

- `message`
- `flags`
- `callback`

---

### Custom message

```js
myBot.slashCommands.listen({
    onError: {
        message: "An error occurred here! Let's try again?",
        flags: 64
    }
});
```

#### Flags

`flags: 64` sends an **ephemeral message**.  

Flags are available from **discord.js v14.14.0** onward.

---

### Using a custom callback

```js
myBot.slashCommands.listen({
    onError: {
        callback: (interaction, error) => {
            interaction.reply(
                "An error occurred while executing the command. Please try again later."
            );

            console.error("Error executing command:", error);
        }
    }
});
```

#### Callback parameters

| Parameter | Description |
|----------|-----------|
| `interaction` | The interaction where the error occurred |
| `error` | `Error` instance containing the occurred error |

---

## Notes

This document covers the use of **`slashCommands` from the `Application` instance**.

---

## Next Examples

Usage of **Application.events** is available at:

```
./Events.md
```

---

## Diving deeper into SlashCommands

```
SlashService/SlashService.md
```