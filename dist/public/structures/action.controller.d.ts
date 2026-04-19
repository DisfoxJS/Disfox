import { DiscordClient, AvatarInput } from "../types/discordclient.types.js";
/**
 * Types for sending or replying messages
 */
interface ReplyTypes {
    content?: string;
    components?: unknown;
    embeds: any[];
    flags: number;
}
/**
 * Service for Discord client actions
 */
export declare class ActionService {
    #private;
    /**
     * Creates an instance of ActionService
     * @param client - The Discord client
     * @param token - Bot token
     */
    constructor(client: DiscordClient, token: string);
    /**
     * Returns the user's avatar hash
     * @returns Avatar hash string or undefined
     */
    getAvatar(): string | undefined;
    /**
     * Returns the user's avatar URL
     * @returns Avatar URL string
     */
    getAvatarUrl(): string | undefined;
    /**
     * Sets the user's avatar
     * @param image - Image to set as avatar
     */
    setAvatar(image: AvatarInput): Promise<void>;
    /**
     * Sets the user's presence
     * @param activityType - Type of activity (PLAYING, WATCHING, LISTENING, etc.)
     * @param activityMessage - Activity message
     * @param status - User status (online, idle, dnd, invisible)
     */
    setPresence(activityType: any, activityMessage: string, status: string): Promise<void>;
    /**
     * Sends a message to a channel
     * @param channelID - ID of the channel
     * @param content - Message content
     */
    sendChannel(channelID: string, content: ReplyTypes): Promise<void>;
    /**
     * Replies to a Discord interaction
     * @param interaction - Discord interaction object
     * @param reply - Content to reply with
     */
    reply(interaction: any, reply: ReplyTypes): Promise<void>;
}
export {};
//# sourceMappingURL=action.controller.d.ts.map