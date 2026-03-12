import path from "path";
import fs from "fs";
import { DisfoxError } from "../../../internal/errors/_disfoxerror.js";
import { DisfoxErrorCode } from "../../../internal/errors/_disfox.errorCode.js";
export class SlashService {
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidsSlash>} Object containing valid and invalid commands.
     *
     * @deprecated This method will be removed in v0.0.5
     * use extractSlashDir() or extractSlashFile()
     */
    static async extractSlashCommands(dir) {
        console.warn("The `SlashService.extractSlashCommands` method was deprecated in Disfox v0.0.5.\nUse `SlashService.extractFile()` or `SlashService.extractDir()`.");
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));
        const valids = [];
        const invalids = [];
        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const command = imported.default ?? imported;
            if ("data" in command && "execute" in command) {
                valids.push(command);
            }
            else {
                invalids.push(command);
            }
        }
        return { valids, invalids };
    }
    /**
     * Extracts slash commands from a directory and validates their structure.
     *
     * Each `.js` file inside the provided directory is dynamically imported.
     * A command is considered valid only if it exports both `data` and `execute`.
     *
     * The result separates valid and invalid command modules.
     *
     * @param {string} dir - Absolute or relative path to the directory containing command files.
     * @returns {Promise<{ valids: SlashCommand[], invalids: any[] }>}
     * An object containing arrays of valid and invalid commands.
     */
    static async extractDir(dir) {
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));
        const valids = [];
        const invalids = [];
        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const command = imported.default ?? imported;
            if ("data" in command && "execute" in command) {
                valids.push(command);
            }
            else {
                invalids.push(command);
            }
        }
        return { valids, invalids };
    }
    /**
     * Extracts a slash command from a single file and validates its structure.
     *
     * The file is dynamically imported and considered valid only if it exports
     * both `data` and `execute`.
     *
     * Throws an error if the file extension is not `.js`.
     *
     * @param {string} filePath - Absolute or relative path to the command file.
     * @throws {DisfoxError} If the file extension is not supported.
     * @returns {Promise<{ valids: SlashCommand[], invalids: any[] }>}
     * An object containing the validated command module separated as valid or invalid.
     */
    static async extractFile(filePath) {
        const resolved = path.resolve(filePath);
        if (!filePath.endsWith('.js')) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.UNKNOWN_EXTENSION,
                "message": "Unsupported file extension. Event extraction only supports .js files.",
                "source": { "body": `SlashService.extractFile` },
            });
        }
        const valids = [];
        const invalids = [];
        const imported = await import(`file://${resolved.replace(/\\/g, "/")}`);
        const module = imported.default ?? imported;
        if ("data" in module && "execute" in module) {
            valids.push(module);
        }
        else {
            invalids.push(module);
        }
        return { valids, invalids };
    }
}
