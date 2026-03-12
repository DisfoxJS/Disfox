var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventController_client;
export class EventController {
    constructor(client) {
        _EventController_client.set(this, void 0);
        __classPrivateFieldSet(this, _EventController_client, client, "f");
    }
    /**
         * Listens to a list of events and executes their corresponding actions.
         *
         * @param {EventType[]} events - Array of event objects. Each event should contain:
         *   - `data`: information related to the event
         *   - `execute`: function that will be called when the event occurs
         *
         * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
         */
    async listenEvents(events) {
        for (const event of events) {
            __classPrivateFieldGet(this, _EventController_client, "f").on(event.data, (...args) => {
                const message = args[0];
                if (message && "author" in message && message.author?.bot)
                    return;
                event.execute(...args);
            });
        }
    }
}
_EventController_client = new WeakMap();
