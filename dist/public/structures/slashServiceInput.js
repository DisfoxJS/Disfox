'strict mode';
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
var _SlashOption_inputDescription, _SlashOption_inputType, _SlashOption_isRequired, _SlashOption_settings;
export class SlashOption {
    constructor(name) {
        _SlashOption_inputDescription.set(this, void 0);
        _SlashOption_inputType.set(this, void 0);
        _SlashOption_isRequired.set(this, void 0);
        _SlashOption_settings.set(this, void 0);
        this.name = name;
        __classPrivateFieldSet(this, _SlashOption_inputType, null, "f");
        __classPrivateFieldSet(this, _SlashOption_inputDescription, null, "f");
        __classPrivateFieldSet(this, _SlashOption_isRequired, false, "f");
        __classPrivateFieldSet(this, _SlashOption_settings, {}, "f");
    }
    ;
    type(type) {
        __classPrivateFieldSet(this, _SlashOption_inputType, type, "f");
        return this;
    }
    ;
    description(description) {
        __classPrivateFieldSet(this, _SlashOption_inputDescription, description, "f");
        return this;
    }
    ;
    required(isRequired) {
        __classPrivateFieldSet(this, _SlashOption_isRequired, isRequired, "f");
        return this;
    }
    ;
    maxNumber(number) {
        __classPrivateFieldGet(this, _SlashOption_settings, "f").maxNumber = number;
    }
    minNumber(number) {
        __classPrivateFieldGet(this, _SlashOption_settings, "f").minNumber = number;
    }
    get data() {
        return {
            name: this.name,
            inputType: __classPrivateFieldGet(this, _SlashOption_inputType, "f"),
            inputDescription: __classPrivateFieldGet(this, _SlashOption_inputDescription, "f"),
            isRequired: __classPrivateFieldGet(this, _SlashOption_isRequired, "f"),
            settings: __classPrivateFieldGet(this, _SlashOption_settings, "f")
        };
    }
}
_SlashOption_inputDescription = new WeakMap(), _SlashOption_inputType = new WeakMap(), _SlashOption_isRequired = new WeakMap(), _SlashOption_settings = new WeakMap();
