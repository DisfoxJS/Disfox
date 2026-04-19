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
var _InteractionPermission_allowed, _InteractionPermission_restricted, _InteractionPermission_interactionType, _InteractionPermission_onViolate;
export class InteractionPermission {
    constructor(config) {
        _InteractionPermission_allowed.set(this, void 0);
        _InteractionPermission_restricted.set(this, void 0);
        _InteractionPermission_interactionType.set(this, void 0);
        _InteractionPermission_onViolate.set(this, void 0);
        __classPrivateFieldSet(this, _InteractionPermission_allowed, [], "f");
        __classPrivateFieldSet(this, _InteractionPermission_restricted, [], "f");
        __classPrivateFieldSet(this, _InteractionPermission_onViolate, () => { }, "f");
        __classPrivateFieldSet(this, _InteractionPermission_interactionType, config.type, "f");
    }
    setAllowed(...allowed) {
        __classPrivateFieldSet(this, _InteractionPermission_allowed, allowed, "f");
        return this;
    }
    setRestricted(...restricted) {
        __classPrivateFieldSet(this, _InteractionPermission_restricted, restricted, "f");
        return this;
    }
    onViolate(callback) {
        callback();
    }
    toObject() {
        return {
            allowed: __classPrivateFieldGet(this, _InteractionPermission_allowed, "f"),
            restricted: __classPrivateFieldGet(this, _InteractionPermission_restricted, "f"),
            interactionType: __classPrivateFieldGet(this, _InteractionPermission_interactionType, "f"),
            onViolate: __classPrivateFieldGet(this, _InteractionPermission_onViolate, "f")
        };
    }
}
_InteractionPermission_allowed = new WeakMap(), _InteractionPermission_restricted = new WeakMap(), _InteractionPermission_interactionType = new WeakMap(), _InteractionPermission_onViolate = new WeakMap();
