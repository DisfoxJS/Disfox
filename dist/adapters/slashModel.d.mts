import { BehaviorTable } from "../public/index.js";
import { Command } from "../public/structures/slashServiceCommand.js";
import { SlashCommandBuilder } from "discord.js";
export interface modifiedSlashCommandBuilder extends SlashCommandBuilder {
    disfoxData?: {
        behaviorTable: BehaviorTable | null;
    };
}
export declare function slashModelAdapter(command: Command): {
    data: any;
    execute: any;
};
//# sourceMappingURL=slashModel.d.mts.map