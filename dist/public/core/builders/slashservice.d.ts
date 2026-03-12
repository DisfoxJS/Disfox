interface SlashCommand {
    data: Record<string, any>;
    execute: (...args: any[]) => void;
}
interface ValidsSlash {
    valids: SlashCommand[];
    invalids: any[];
}
export declare class SlashService {
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidsSlash>} Object containing valid and invalid commands.
     */
    static extractSlashCommands(dir: string): Promise<ValidsSlash>;
}
export {};
//# sourceMappingURL=slashservice.d.ts.map