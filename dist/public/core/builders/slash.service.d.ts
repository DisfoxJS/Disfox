import { SlashCommand } from "../../types/slashcommand.types.js";
export declare class SlashService {
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidsSlash>} Object containing valid and invalid commands.
     */
    static extractSlashCommands(dir: string): Promise<{
        valids: SlashCommand[];
        invalids: any[];
    }>;
}
//# sourceMappingURL=slash.service.d.ts.map