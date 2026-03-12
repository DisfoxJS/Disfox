import { DiscordClient, AvatarInput } from "../../../types/discordclient.types.js";
import { ActionService } from "./action.service.js";
import { EventController } from "./events.controller.js";
import { SlashController } from "./slash.controller.js";

interface SettingsType {
    client: DiscordClient
    token: string
}

export class Application {
    #client: DiscordClient;
    #token: string;
    actions: ActionService;
    events: EventController;
    slash: SlashController;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     */
    slashCommands: SlashController;
    constructor(settings: SettingsType) {
        this.#client = settings.client
        this.#token = settings.token
        this.actions = new ActionService(this.#client, this.#token)
        this.events = new EventController(this.#client)
        this.slash = new SlashController(this.#client)
        this.slashCommands = this.slash
    }

    /**
     * @deprecated Use {@link client} instead.
     */
    public get getClient() {
        if (!this.#client) {
            throw new Error(`The client is not defined.`)
        } 
        
        return this.#client
        
    }

    public get client() {
        if (this.#client == null) {
            throw new Error(`The client is not defined.`)
        } else {
            return this.#client
        }
    }

    public get user() {
        if (this.#client.user == null) {
            throw new Error('The client is not logged in. User is null.')
        } else {
            return this.#client.user
        }
    }

    /**
     * Connects the client to Discord.
     */
    public async connect() {
        if (!this.#token) {
            throw new Error("Token is not defined.")
        }
        await this.#client.login(this.#token)
    }

}


