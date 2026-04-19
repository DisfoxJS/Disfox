import { DisfoxErrorCode } from "../errors/_disfox.errorCode.js";
import { DisfoxError } from "../errors/_disfoxerror.js";
import { AvatarInput } from "../types/discordclient.types.js";
import { Response } from "../core/modules/response.js";
import { Client } from "discord.js";

interface SlashListenOptions {
    onError?: {
        message?: string
        flags?: number
        callback?: (interaction: any, error: any) => any
    }
}

export class ApplicationSlash {
    #client: Client
    #globalSlash = new Map()
    #guildSlash = new Map()

    constructor(client: Client) {
        this.#client = client
    }

    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    async deployGlobal(commands: any[]) {
        console.log("RECEIVED: ", commands)
        if (this.#client == null) {
            throw new DisfoxError({
                    "code": DisfoxErrorCode.UNKNOWN,
                    "message": "Client probably is null",
                    "source": {
                        body: { "method": "SlashController.deployGuilds()" }
                    }
                })
        }
        commands.map(command => this.#globalSlash.set(command.data.name, command))
        
        for (const command of commands ) {
            
            (this.#client as any).application.commands.create(command.data.toJSON())
        }
    }

    /**
     * Deploy slash commands to specific guilds.
     *
     * @param commands List of slash command objects.
     * @param guilds Guild IDs where the commands will be registered.
     */
    async deployGuilds(commands: any[], guilds: string[]) {

        for (const guildId of guilds) {

            const guild = this.#client.guilds.cache.get(String(guildId))

            if (!guild) {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.GUILD_NOT_FOUND,
                    "message": "Unable to find the guild with the provided ID.",
                    "source": {
                        body: { "method": "SlashController.deployGuilds()" }
                    }
                })
            }

            for (const command of commands) {
                this.#guildSlash.set(command.data.name, command)
            }

            await guild.commands.set(
                commands.map(c => c.data.toJSON())
            )
        }
    }

    /**
     * @deprecated Will be removed in v0.0.5.
     * Use {@link listen} instead.
     */
    async listenCommands(commands: any[], onErrorMessage: string = "An error occurred while executing this command. Please try again later.") {
        console.warn(
            "The `.extractSlashCommands()` method was deprecated in Disfox v0.0.5.\nUse `SlashService.extractFile()` or `SlashService.extractDir()`."
        )

        const res = new Response({ commands, onErrorMessage });

        (this.#client as any).on("interactionCreate", async (interaction: any) => {

            if (!interaction.isChatInputCommand()) return

            const cmd: any = commands.find(
                c => c.data.name === interaction.commandName
            )

            if (!cmd) return

            try {

                await cmd.execute(interaction)
                return interaction

            } catch (err) {

                await interaction.reply(onErrorMessage)

                console.error(
                    res.error({
                        message: "Failed to execute Slash Command.",
                        code: "sl_exe_err",
                        content: err
                    }).result
                )
            }
        })
    }

    /**
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param callback Optional callback executed after a command runs successfully.
     */
    async listen(data: SlashListenOptions = {}, callback?: (interaction: any) => any) {

        const all = [
            ...this.#globalSlash.values(),
            ...this.#guildSlash.values()
        ];

       
        this.#client.on("interactionCreate", async (interaction: any) => {
            
            if (!interaction.isChatInputCommand()) return

            const cmd: any = all.find(
                c => c.data.name === interaction.commandName
            )

            if (!cmd) return

            try {

                await cmd.execute(interaction)

                if (callback) {
                    try {
                        await callback(interaction)
                    } catch (err) {

                        throw new DisfoxError({
                            "code": DisfoxErrorCode.SLASH_EXECUTE,
                            "message": "Failed to execute Slash Command",
                            "source": {
                                body: { "method": "SlashController.listen()", "error": err }
                            }
                        })

                    }
                }

            } catch (err) {
                if (data.onError?.callback) {
                    return data.onError.callback(interaction, err)
                }

                const payload = {
                    content:
                        data.onError?.message ??
                        "An error occurred while executing this command. Please try again later.",
                    flags: data.onError?.flags
                }

                if (!interaction.replied || interaction.deferred) {
                    await interaction.reply(payload)
                }

                throw new DisfoxError({
                    "code": DisfoxErrorCode.SLASH_EXECUTE,
                    "message": "Failed to execute Slash Command",
                    "source": {
                        body: { "method": "SlashController.listen()", "error": err }
                    }
                })
            }
        })
    }

}

