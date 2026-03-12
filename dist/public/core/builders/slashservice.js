import path from "path";
import fs from "fs";
export class SlashService {
    /**
     * Extracts slash commands from a directory and validates their structure.
     * A command is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid commands.
     *
     * @param {string} dir - Path to the commands directory.
     * @returns {Promise<ValidsSlash>} Object containing valid and invalid commands.
     */
    static async extractSlashCommands(dir) {
        const cmdsPath = path.resolve(dir);
        const files = fs.readdirSync(cmdsPath).filter(f => f.endsWith(".js"));
        const ValidsData = [];
        const Invalids = [];
        for (const file of files) {
            const filePath = path.join(cmdsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const command = imported.default ?? imported;
            if ("data" in command && "execute" in command) {
                ValidsData.push(command);
            }
            else {
                Invalids.push(command);
            }
        }
        return { valids: ValidsData, invalids: Invalids };
    }
}
