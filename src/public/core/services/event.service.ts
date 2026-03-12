import path from "path";
import fs from "fs"
import { DisfoxError } from "../../../internal/errors/_disfoxerror.js";
import { DisfoxErrorCode } from "../../../internal/errors/_disfox.errorCode.js";

interface EventType {
    data: Record<string, any>
    execute: (...args: any[]) => void   
}

interface ValidEvents {
    valids: EventType[]
    invalids: any[]
}

export class EventService {
    /**
     * Extracts all event modules from a directory.
     *
     * This method reads all `.js` files in the given directory, imports them dynamically,
     * and separates them into valid and invalid events. A valid event is an object
     * containing both `data` and `execute` properties.
     *
     * @param {string} dir - The path to the directory containing event files.
     * @returns {Promise<{ valids: any[], invalids: EventType[] }>} An object containing arrays of valid and invalid events.
     */
    static async extractDir(dir: string): Promise<ValidEvents> {
        const eventsPath = path.resolve(dir)
        const files = fs.readdirSync(eventsPath)

        let valids: any[] = []
        let invalids: EventType[] = []

        for (const file of files) {
            const filePath = path.join(eventsPath, file)
            const imported = await import(`file://${filePath.replace(/\\/g, "/")}`);
            const event = imported.default ?? imported;

            if ("data" in event && "execute" in event) {
                valids.push(event)
            } else {
                invalids.push(event)
            }
        }
        return {valids, invalids}
    }

    /**
     * Extracts a single event module from a file.
     *
     * This method imports a `.js` file dynamically and checks if it contains
     * both `data` and `execute` properties. Throws an error if the file extension
     * is unsupported.
     *
     * @param {string} filePath - The path to the `.js` event file.
     * @returns {Promise<{ valids: EventType[], invalids: any[] }>} An object containing the valid event or invalid module.
     * @throws {DisfoxError} If the file extension is not `.js`.
     */
    static async extractFile(filePath: string) {
        if (!filePath.endsWith('.js')) {
            throw new DisfoxError({
                "code": DisfoxErrorCode.UNKNOWN_EXTENSION,
                "message": "Unsupported file extension. Event extraction only supports .js files.",
                "source": {"body": `EventService.extractFile()`},
                
            })
        }

        const valids: EventType[] = []
        const invalids: any[] = []
        const resolved = path.resolve(filePath)
        const imported = (await import(`file://${resolved.replace(/\\/g, "/")}`))
        const module = imported.default ?? imported

        if ("data" in module && "execute" in module) {
            valids.push(module)
        } else {
            invalids.push(module)
        }

        return {valids, invalids}
    }
}
