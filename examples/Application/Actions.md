#4

# Application Actions — disfox

In this example, we will cover everything about the **Actions** field of the `Application` class.

`Actions` is an object of the `Application`, used to perform application-related actions.

If you haven't seen the detailed example on how to create an `Application` instance, check:

```
examples/Application/creatingApp.md
```

---

## 1. Required Imports (discord.js)

```js
import { Client, GatewayIntentBits, Events, ActivityType, PresenceUpdateStatus } from "discord.js"; // Events is optional.
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

## 5. Logging in the application

> Always log in **before performing actions**.

```js
await myBot.connect();
```

---

## 6. Client / Application Actions

```js
myBot.actions.getAvatar() // Returns the application avatar hash
myBot.actions.getAvatarUrl() // Returns the application avatar URL

await myBot.actions.setAvatar("https://image_url.com") // Changes the application avatar from an image URL

await myBot.actions.setPresence(
    ActivityType.Watching, 
    "Watching Something!", 
    PresenceUpdateStatus.Online
) // Changes the presence status, receiving activity type, message, and status as parameters

await myBot.actions.sendChannel("1234567", { content: "Hello everyone!" }) // Sends content to a specified channel by ID

await myBot.actions.reply(interaction, { content: "Hello, I replied to your message." }) // Replies to an interaction with content
```

---

## Notes

This document covers the use of **`actions` from the `Application` instance**.

These methods are designed to simplify certain functions related to the client or the application user.

---

## Next Examples

Usage of **Application.actions** available at:

```
./Actions.md
```

---

## Diving into Events

```
EventService/EventService.md
```