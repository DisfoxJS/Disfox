import { SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping")
    .description("replies with Pong!")
    .mark(SlashTag.AdminOnly)
    .action(async interaction => {
        await interaction.reply("Pong!")
    });

export default command;
