import { Events } from "discord.js";


export default {
    name: Events.ClientReady,
    async execute(client) {
        console.log("Client online: ", client.user.tag)
        
    }
}