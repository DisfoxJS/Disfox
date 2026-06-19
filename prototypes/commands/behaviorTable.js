import { SlashService, BehaviorTable, BehaviorContext, SlashOptions } from "disfox";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const dn = path.dirname(fileURLToPath(import.meta.url));
const filepath = path.join(dn, "..", "data", "restricted.json");

// Getting restricted id's array on restricted.json
const restricted = await fs.readFile(filepath, "utf-8");
const parsed = JSON.parse(restricted);

// Creating the Behavior Table
const table = new BehaviorTable({
    context: BehaviorContext.SlashCommand,
    restricted: {
       userId: parsed
    },
    onViolate: {
        alert: {
            content: "This command is not available to you.",
            flags: 64
        }
    }
});

// Creating the member option to apply timeout
const memberOption = new SlashService.Option("member")
    .description("Select member to timeout")
    .type(SlashOptions.Mentionable)
    .required(true);

// Creating Slash Command and applying the table and option.
const command = new SlashService.Command("mute")
    .description("Apply timeout on member")
    .dock(table)
    .option(memberOption)
    .action(async interaction => {
        const user = interaction.options.getUser("member");

        // Getting target member
        const member = await interaction.guild?.members.fetch(user.id);

        if (!member) {
            return interaction.reply({
                content: "Member not found.",
                flags: 64
            });
        }

        await member.timeout(
            10 * 60 * 1000,
            `Muted by ${interaction.user.tag}`
        );

        await interaction.reply({
            content: `✅ ${user.tag} has been muted for 10 minutes.`,
            flags: 64
        });
    });

export default command;

// DisfoxJS org