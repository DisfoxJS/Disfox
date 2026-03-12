import path from "path";
import fs from "fs";
export class EventService {
    /**
     * Extracts events from a directory and validates their structure.
     * An event is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid events.
     *
     * @param {string} dir - Path to the events directory.
     * @returns {Promise<ValidEvents>} Object containing valid and invalid events.
     */
    static async extractEvents(dir) {
        const eventsPath = path.resolve(dir);
        const files = fs.readdirSync(eventsPath);
        let valids = [];
        let invalids = [];
        for (const file of files) {
            const filePath = path.join(eventsPath, file);
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const event = imported.default ?? imported;
            if ("data" in event && "execute" in event) {
                valids.push(event);
            }
            else {
                invalids.push(event);
            }
        }
        return { valids, invalids };
    }
}
