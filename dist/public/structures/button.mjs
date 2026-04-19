var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _InputButton_label, _InputButton_id, _InputButton_emoji, _InputButton_style;
import { ButtonStyle } from "discord.js";
export class InputButton {
    constructor(style) {
        _InputButton_label.set(this, void 0);
        _InputButton_id.set(this, void 0);
        _InputButton_emoji.set(this, void 0);
        _InputButton_style.set(this, void 0);
        __classPrivateFieldSet(this, _InputButton_style, style || ButtonStyle.Primary, "f");
        ;
        __classPrivateFieldSet(this, _InputButton_label, null, "f");
        __classPrivateFieldSet(this, _InputButton_id, null, "f");
    }
    /**
     * label
label : string     */
    label(label) {
        __classPrivateFieldSet(this, _InputButton_label, label, "f");
    }
    /**
     * id
id : string     */
    id(id) {
        __classPrivateFieldSet(this, _InputButton_id, id, "f");
    }
    /**
     * emoji
emoji : string     */
    emoji(emoji) {
        __classPrivateFieldSet(this, _InputButton_emoji, emoji, "f");
    }
}
_InputButton_label = new WeakMap(), _InputButton_id = new WeakMap(), _InputButton_emoji = new WeakMap(), _InputButton_style = new WeakMap();
