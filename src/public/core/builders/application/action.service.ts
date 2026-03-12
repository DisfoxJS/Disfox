import { DiscordClient, AvatarInput } from "../../../types/discordclient.types.js";
import { sendC } from "../../utils/sendchannel.js";

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
export class ActionService {
    /** Discord client instance */
    #client: DiscordClient;

    /** Bot token */
    #token: string;

    /**
     * Creates an instance of ActionService
     * @param client - The Discord client
     * @param token - Bot token
     */
    constructor(client: DiscordClient, token: string) {
        this.#client = client;
        this.#token = token;
    }

    /**
     * Returns the user's avatar hash
     * @returns Avatar hash string or undefined
     */
    getAvatar(): string | undefined {
        return this.#client?.user?.avatar;
    }

    /**
     * Returns the user's avatar URL
     * @returns Avatar URL string
     */
    getAvatarUrl(): string | undefined {
        return (this.#client as any)?.user?.displayAvatarURL();
    }

    /**
     * Sets the user's avatar
     * @param image - Image to set as avatar
     */
    async setAvatar(image: AvatarInput): Promise<void> {
        await this.#client?.user?.setAvatar(image);
    }

    /**
     * Sets the user's presence
     * @param activityType - Type of activity (PLAYING, WATCHING, LISTENING, etc.)
     * @param activityMessage - Activity message
     * @param status - User status (online, idle, dnd, invisible)
     */
    async setPresence(activityType: any, activityMessage: string, status: string): Promise<void> {
        await this.#client.user.setPresence({
            activities: [{ name: activityMessage, type: activityType }],
            status: status,
        });
    }

    /**
     * Sends a message to a channel
     * @param channelID - ID of the channel
     * @param content - Message content
     */
    async sendChannel(channelID: string, content: ReplyTypes): Promise<void> {
        if (!this.#token) throw new Error("Client token is not defined.");
        sendC(this.#token, channelID, content);
    }

    /**
     * Replies to a Discord interaction
     * @param interaction - Discord interaction object
     * @param reply - Content to reply with
     */
    async reply(interaction: any, reply: ReplyTypes): Promise<void> {
        if (interaction.replied || interaction.deferred) {
            console.error("Interaction already replied or deferred.");
            return;
        }
        await interaction.reply(reply);
    }
}