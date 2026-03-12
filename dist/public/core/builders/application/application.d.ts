import { DiscordClient, AvatarInput } from "../../../types/discordclient.types.js";
import { ActionService } from "./action.service.js";
import { EventController } from "./events.controller.js";
import { SlashController } from "./slash.controller.js";
interface SettingsType {
    client: DiscordClient;
    token: string;
}
export declare class Application {
    #private;
    actions: ActionService;
    events: EventController;
    slash: SlashController;
    /**
     * @deprecated Use {@link slash} instead. Removed in Disfox 0.0.5
     */
    slashCommands: SlashController;
    constructor(settings: SettingsType);
    /**
     * @deprecated Use {@link client} instead.
     */
    get getClient(): DiscordClient;
    get client(): DiscordClient;
    get user(): {
        id: string;
        username: string;
        avatar?: string;
        setAvatar(image: AvatarInput): Promise<void>;
        setPresence({}: {}): Promise<void>;
    };
    /**
     * Connects the client to Discord.
     */
    connect(): Promise<void>;
}
export {};
//# sourceMappingURL=application.d.ts.map