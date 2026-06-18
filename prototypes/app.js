
import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { SlashService, Application } from "disfox"

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ]
})

const token = process.env.TK

if (!token) {
    throw new Error("TK is not defined in .env");
}

const app = new Application({
    "client": client,
    token: token
})


const command = await SlashService.extractDir('./prototypes/commands', {
    "autoConverts": true
});

app.connect()

app.client.once(Events.ClientReady, async () => {
    console.log("Online")
    await app.slash.deployGlobal(command.valid)
    app.slash.listen();
})