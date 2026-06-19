
import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { SlashService, Application, EventService } from "disfox"

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ]
})

const token = process.env.TOKEN

if (!token) {
    throw new Error("TOKEN is not defined in .env");
}

const app = new Application({
    "client": client,
    token: token
})


const commands = await SlashService.extractDir('./prototypes/commands', {
    "autoConverts": true
});

const events = await EventService.extractDir('./prototypes/events')

await app.connect()

await app.events.listenEvents(events.valid)
await app.slash.deployGlobal(commands.valid)
await app.slash.listen();