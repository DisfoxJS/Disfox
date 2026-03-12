import { DiscordClient, AvatarInput } from "../../../types/discordclient.types.js";
interface replyTypes {
    content?: string;
    components?: unknown;
    embeds: any[];
    flags: number;
}
export declare class ActionService {
    #private;
    constructor(client: DiscordClient, token: string);
    actions: {
        getAvatar: () => string | undefined;
        getAvatarUrl: () => any;
        setAvatar: (image: AvatarInput) => Promise<void>;
        setPresence: (activityType: any, activityMessage: string, status: string) => Promise<void>;
        sendChannel: (channelID: string, content: replyTypes) => Promise<void>;
        reply: (interaction: any, reply: replyTypes) => Promise<void>;
    };
}
export {};
//# sourceMappingURL=actions.service.d.ts.map