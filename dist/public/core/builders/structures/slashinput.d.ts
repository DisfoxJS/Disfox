import { SlashOptions } from "./slashOptions.js";
export declare class SlashInput {
    name: string;
    _inputDescription: string | null;
    _inputType: SlashOptions[keyof SlashOptions] | null;
    _isRequired: boolean;
    constructor(name: string);
    type(type: SlashOptions[keyof SlashOptions]): this;
    description(description: string): this;
    required(isRequired: boolean): this;
}
//# sourceMappingURL=slashinput.d.ts.map