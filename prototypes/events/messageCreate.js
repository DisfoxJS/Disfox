import { Events } from "discord.js";

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.content !== ".ping") return;

        await message.reply("Pong!")
    }
}