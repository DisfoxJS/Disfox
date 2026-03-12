interface EventType {
    data: Record<string, any>;
    execute: (...args: any[]) => void;
}
interface ValidEvents {
    valids: EventType[];
    invalids: any[];
}
export declare class EventService {
    /**
     * Extracts events from a directory and validates their structure.
     * An event is considered valid only if it exports both `data` and `execute`.
     * Returns an object separating valid and invalid events.
     *
     * @param {string} dir - Path to the events directory.
     * @returns {Promise<ValidEvents>} Object containing valid and invalid events.
     */
    static extractEvents(dir: string): Promise<ValidEvents>;
}
export {};
//# sourceMappingURL=event.service.d.ts.map