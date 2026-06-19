import { SlashService, BehaviorTable, BehaviorContext, SlashTag } from "disfox";

// Creating a command that only appears for administrator roles in the Discord interface.
const command = new SlashService.Command("hello")
    .description("replies with World!")
    .mark(SlashTag.AdminOnly) // This is an AdminOnly tag that restricts the command to administrator roles only.
    .action(async interaction => {
        await interaction.reply("World!")
    });

export default command;