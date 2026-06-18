import { DisfoxErrorCode } from "../../internal/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../internal/errors/_disfoxerror.js";
import { Client, Events, Interaction } from "discord.js";
import { BehaviorTable } from "../core/modules/behaviorTable.js";
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
    #listener: ((interaction : Interaction) => Promise<void>) | null = null
    listening: boolean = false;

    constructor(client: Client) {
        this.#client = client
    }

    /**
     * Deploy slash commands globally.
     *
     * @param commands List of slash command objects.
     */
    async deployGlobal(commands: any[]) {
        
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
     * Listen for slash command executions.
     *
     * @param data Listener configuration options.
     * @param listener Optional listener executed after a command runs successfully.
     */
    async listen(data: SlashListenOptions = {}, listener?: (interaction: any) => any) {

        const all = [
            ...this.#globalSlash.values(),
            ...this.#guildSlash.values()
        ];

        this.#listener = async (interaction: any) => {
       
            if (!interaction.isChatInputCommand()) return


            const cmd: any = all.find(
                c => c.data.name === interaction.commandName
            )


            if (!cmd) return

            try {

                const behaviorTable : BehaviorTable | null = cmd.data.disfoxData?.behaviorTable ?? null;

                if (behaviorTable) {
                    const task = await behaviorTable.attachment.execute({cmd: cmd, interaction: interaction})
                    if (!task.continue) return;
                }

                await cmd.execute(interaction)

                if (listener) {
                    try {
                        await listener(interaction)
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
        }

        this.#client.on(Events.InteractionCreate, this.#listener)

    }

     /**
     * close the listener for slash command executions.
     */
    close() {
        if (!this.#listener) return;

        this.#client.off(Events.InteractionCreate, this.#listener)
        this.#listener = null;
        this.listening = false;
    }

}

