interface SlashCommand {
    data: Record<string, any>;
    execute: (...args: any[]) => void;
}
interface ValidsSlash {
    valids: SlashCommand[];
    invalids: any[];
}
export { SlashCommand, ValidsSlash };
//# sourceMappingURL=slashcommand.types.d.ts.map