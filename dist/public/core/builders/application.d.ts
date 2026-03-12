import { DiscordClient, AvatarInput } from "../../types/discordclient.types.js";
interface replyTypes {
    content?: string;
    components?: unknown;
    embeds: any[];
    flags: number;
}
interface EventType {
    data: Record<string, any>;
    execute: (...args: any[]) => void;
}
interface SettingsType {
    client: DiscordClient;
    token: string;
}
interface SlashListenOptions {
    onError?: {
        message?: string;
        flags?: number;
        callback?: (interaction: any, error: any) => any;
    };
}
export declare class Application {
    #private;
    constructor(settings: SettingsType);
    /**
     * @deprecated Use .client instead.
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
    connect(): Promise<void>;
    actions: {
        getAvatar: () => string | undefined;
        setAvatar: (image: AvatarInput) => Promise<void>;
        setPresence: (activityType: any, activityMessage: string, status: string) => Promise<void>;
        sendChannel: (channelID: string, content: replyTypes) => Promise<void>;
        reply: (interaction: any, reply: replyTypes) => Promise<void>;
    };
    /**
     * Stores slash command data related to the application and guilds.
     */
    slashCommands: {
        /**
         * Loads application-wide (global) slash commands.
         *
         * @param {[]} commands - List of slash command data objects to be registered globally.
         */
        deployGlobal: (commands: any[]) => Promise<void>;
        /**
         * Loads application-wide (guild) slash commands.
         *
         * @param {[]} commands - List of slash command data objects to be registered globally.
         */
        deployGuilds: (commands: any[], guilds: string[]) => Promise<void>;
        /**
         * @deprecated This method will be removed in v0.0.5
         * Use slashCommand.listen()
        */
        listenCommands: (commands: any[], onErrorMessage?: string) => Promise<void>;
        listen: (data: SlashListenOptions, callback?: (interaction: any) => any) => Promise<void>;
    };
    events: {
        /**
          * Listens to a list of events and executes their corresponding actions.
          *
          * @param {EventType[]} events - Array of event objects. Each event should contain:
          *   - `data`: information related to the event
          *   - `execute`: function that will be called when the event occurs
          *
          * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
          */
        listenEvents: (events: EventType[]) => Promise<void>;
    };
}
export {};
//# sourceMappingURL=application.d.ts.map