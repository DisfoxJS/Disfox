var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _DfxTickets_settings, _DfxTickets_embed;
class DfxTickets {
    constructor(settings) {
        _DfxTickets_settings.set(this, void 0);
        _DfxTickets_embed.set(this, void 0);
        __classPrivateFieldSet(this, _DfxTickets_settings, settings, "f");
    }
    setEmbed(embed) {
        __classPrivateFieldSet(this, _DfxTickets_embed, embed, "f");
    }
}
_DfxTickets_settings = new WeakMap(), _DfxTickets_embed = new WeakMap();
export {};
