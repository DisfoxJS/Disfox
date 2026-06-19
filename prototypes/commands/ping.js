import { SlashService } from "disfox";

// Creating the Slash Command with dfx model.
const command = new SlashService.Command("ping")
    .description("replies with Pong!")
    .action(async interaction => {
        await interaction.reply("Pong!")
    });

export default command;