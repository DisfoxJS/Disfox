import { Command } from "../../structures/slashServiceCommand.js";
import { SlashOption } from "../../structures/slashServiceOption.js";
import { SlashCommand } from "../../types/slash.types.js";
export declare class SlashService {
    static Option: typeof SlashOption;
    static Command: typeof Command;
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidSlash>} Object containing valid and invalid commands.
     *
     * @deprecated This method will be removed in v0.0.5
     * use extractSlashDir() or extractSlashFile()
     */
    static extractSlashCommands(dir: string): Promise<{
        valid: SlashCommand[];
        invalid: any[];
    }>;
    /**
     * Extracts slash commands from a directory and validates their structure.
     *
     * Each `.js` file inside the provided directory is dynamically imported.
     * A command is considered valid only if it exports both `data` and `execute`.
     *
     * The result separates valid and invalid command modules.
     *
     * @param {string} dir - Absolute or relative path to the directory containing command files.
     * @returns {Promise<{ valid: SlashCommand[], invalid: any[] }>}
     * An object containing arrays of valid and invalid commands.
     */
    static extractDir(dir: string): Promise<{
        valid: SlashCommand[];
        invalid: any[];
    }>;
    /**
     * Extracts a slash command from a single file and validates its structure.
     * both `data` and `execute`.
     * Throws an error if the file extension is not `.js`.
     *
     * @param {string} filePath - Absolute or relative path to the command file.
     * @throws {DisfoxError} If the file extension is not supported.
     * @returns {Promise<SlashCommand[]>}
     */
    static extractFile(filePath: string): Promise<SlashCommand[]>;
}
//# sourceMappingURL=slash.service.d.ts.map