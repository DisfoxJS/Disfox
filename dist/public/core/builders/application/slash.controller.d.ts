import { DiscordClient } from "../types/discordclient.types.js";
interface SlashListenOptions {
    onError?: {
        message?: string;
        flags?: number;
        callback?: (interaction: any, error: any) => any;
    };
}
export declare class SlashController {
    #private;
    constructor(client: DiscordClient);
    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    deployGlobal(commands: any[]): Promise<void>;
    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    deployGuilds(commands: any[], guilds: string[]): Promise<void>;
    /**
     * @deprecated Will be removed in v0.0.5.
     * Use {@link listen} instead.
     */
    listenCommands(commands: any[], onErrorMessage?: string): Promise<void>;
    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param callback Optional callback executed after a command runs successfully.
     */
    listen(data?: SlashListenOptions, callback?: (interaction: any) => any): Promise<void>;
}
export {};
//# sourceMappingURL=slash.controller.d.ts.map