import { DiscordClient } from "../../../types/discordclient.types.js";


interface EventType {
    data: Record<string, any>
    execute: (...args: any[]) => void   
}

export class EventController {
    #client: DiscordClient;

    constructor(client: DiscordClient) {
        this.#client = client
    }
    
    /**
         * Listens to a list of events and executes their corresponding actions.
         *
         * @param {EventType[]} events - Array of event objects. Each event should contain:
         *   - `data`: information related to the event
         *   - `execute`: function that will be called when the event occurs
         *
         * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
         */
    async listenEvents (events: EventType[]) {
        for (const event of events) {
            (this.#client as any).on(event.data, (...args: any[]) => {
                    const message = args[0]
                        if (message && "author" in message && message.author?.bot) return;
                        event.execute(...args)
            })
        }
    }
}