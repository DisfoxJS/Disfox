export type AvatarInput = string | Buffer | ArrayBuffer | Uint8Array;
export interface DiscordClient {
    login(token: string): Promise<unknown>;
    destroy(): void;
    guilds: any;
    user: {
        id: string;
        username: string;
        avatar?: string;
        setAvatar(image: AvatarInput): Promise<void>;
        setPresence({}: {}): Promise<void>;
    };
}
//# sourceMappingURL=discordclient.d.ts.map