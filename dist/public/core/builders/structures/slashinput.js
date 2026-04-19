'strict mode';
export class SlashInput {
    constructor(name) {
        this.name = name;
        this._inputType = null;
        this._inputDescription = null;
        this._isRequired = false;
    }
    ;
    type(type) {
        this._inputType = type;
        return this;
    }
    ;
    description(description) {
        this._inputDescription = description;
        return this;
    }
    ;
    required(isRequired) {
        this._isRequired = isRequired;
        return this;
    }
    ;
}
