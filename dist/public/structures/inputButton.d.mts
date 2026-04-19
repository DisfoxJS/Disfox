import { ButtonStyle } from "discord.js";
/**
 * @typedef {Object} InteractionPermissions
 * @property {string[]} restricted - List of restricted users IDs
 * @property {string[]} allowed - List of allowed users IDs
 */
interface InteractionPermissions {
    restricted: string[];
    allowed: string[];
}
export declare class InputButton {
    #private;
    constructor(style: ButtonStyle);
    /**
     * label
    label : string     */
    label(label: string): void;
    /**
     * id
id : string     */
    id(id: string): void;
    /**
     * emoji
emoji : string     */
    emoji(emoji: string): void;
    interactionPermission(permissions: InteractionPermissions): this;
}
export {};
//# sourceMappingURL=inputButton.d.mts.map