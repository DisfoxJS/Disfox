#1

# disfox + discord.js — Creating an Application

In this example, we will learn how to create and configure your application using **disfox** + **discord.js**.

With just one instance of `Application`, you get:

- Simplified event system
- Automatic command registration
- Scalable organization
- Other useful features

---

## 1. Required Imports

First, import **discord.js** and **disfox**.

```js
import { Client, GatewayIntentBits } from "discord.js";
import { Application } from "disfox";
```

---

## 2. Creating the client with discord.js

```js
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
```

---

## 3. Creating the Application instance

Now we create an instance of the `Application` class, which represents both the **client** and the **bot application**.

```js
const myBot = new Application({
    client: client,
    token: "MyApplication_TOKEN"
});
```

### Parameters

| Parameter | Description |
|-----------|------------|
| `client` | Instance of `Client` created with **discord.js** |
| `token` | Discord application token |

---

## 4. Connecting the application

Log in with the bot.

```js
await myBot.connect();
```

If everything is correct, the bot will be **online**.

---

## Next steps

Now you can access the services provided by the application.

Example:

```js
myBot.slashCommands
```

Related documentation:

```
./app.slashCommands.md
```