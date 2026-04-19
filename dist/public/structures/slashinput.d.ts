import { SlashOptions } from "./slashOptions.js";
interface SlashInputSettings {
    minNumber: number;
    maxNumber: number;
}
export declare class SlashInput {
    name: string;
    _inputDescription: string | null;
    _inputType: SlashOptions[keyof SlashOptions] | null;
    _isRequired: boolean;
    _settings: SlashInputSettings | Record<any, any>;
    constructor(name: string);
    type(type: SlashOptions[keyof SlashOptions]): this;
    description(description: string): this;
    required(isRequired: boolean): this;
    maxNumber(number: number): void;
    minNumber(number: number): void;
}
export {};
//# sourceMappingURL=slashinput.d.ts.map