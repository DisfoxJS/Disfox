import { SlashOptions } from "./slashOptions.js";
interface SlashInputSettings {
    minNumber: number;
    maxNumber: number;
}
export declare class SlashOption {
    #private;
    name: string;
    constructor(name: string);
    type(type: SlashOptions[keyof SlashOptions]): this;
    description(description: string): this;
    required(isRequired: boolean): this;
    maxNumber(number: number): void;
    minNumber(number: number): void;
    get data(): {
        name: string;
        inputType: typeof import("discord.js").SlashCommandStringOption | typeof import("discord.js").SlashCommandNumberOption | typeof import("discord.js").SlashCommandChannelOption | typeof import("discord.js").SlashCommandBooleanOption | typeof import("discord.js").SlashCommandRoleOption | typeof import("discord.js").SlashCommandAttachmentOption | typeof import("discord.js").SlashCommandMentionableOption | null;
        inputDescription: string | null;
        isRequired: boolean;
        settings: SlashInputSettings | Record<any, any>;
    };
}
export {};
//# sourceMappingURL=slashServiceInput.d.ts.map