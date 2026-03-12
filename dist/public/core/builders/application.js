var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Application_client, _Application_token, _Application_globalSlash, _Application_guildSlash;
import { sendC } from "../utils/sendchannel.js";
import { Response } from "./response.js";
export class Application {
    constructor(settings) {
        _Application_client.set(this, void 0);
        _Application_token.set(this, void 0);
        _Application_globalSlash.set(this, new Map());
        _Application_guildSlash.set(this, new Map());
        this.actions = {
            getAvatar: () => {
                return __classPrivateFieldGet(this, _Application_client, "f")?.user?.avatar;
            },
            setAvatar: async (image) => {
                await __classPrivateFieldGet(this, _Application_client, "f")?.user?.setAvatar(image);
            },
            setPresence: async (activityType, activityMessage, status) => {
                await __classPrivateFieldGet(this, _Application_client, "f").user.setPresence({
                    activities: [{ name: activityMessage, type: activityType }],
                    status: status
                });
            },
            sendChannel: async (channelID, content) => {
                const token = __classPrivateFieldGet(this, _Application_token, "f");
                if (!token)
                    throw new Error('Client Token is not defined.');
                sendC(token, channelID, content);
            },
            reply: async (interaction, reply) => {
                if (interaction.replied || interaction.deferred) {
                    console.error("Interaction alreary replied or deferred.");
                }
                else {
                    await interaction.reply(reply);
                }
            }
        };
        /**
         * Stores slash command data related to the application and guilds.
         */
        this.slashCommands = {
            /**
             * Loads application-wide (global) slash commands.
             *
             * @param {[]} commands - List of slash command data objects to be registered globally.
             */
            deployGlobal: async (commands) => {
                commands.map(command => __classPrivateFieldGet(this, _Application_globalSlash, "f").set(command.name, command));
                await __classPrivateFieldGet(this, _Application_client, "f").application.commands.set(commands.map(c => c.data.toJSON()));
            },
            /**
             * Loads application-wide (guild) slash commands.
             *
             * @param {[]} commands - List of slash command data objects to be registered globally.
             */
            deployGuilds: async (commands, guilds) => {
                for (const guildId of guilds) {
                    const guild = __classPrivateFieldGet(this, _Application_client, "f").guilds.cache.get(String(guildId));
                    if (!guild) {
                        const res = new Response({ commands, guildId });
                        res.error({
                            code: "guild_not_found",
                            message: "Unable to find the guild with the provided ID.",
                            reason: "invalid id?"
                        });
                        throw res;
                    }
                    for (const command of commands) {
                        __classPrivateFieldGet(this, _Application_guildSlash, "f").set(command.name, command);
                    }
                    await guild.commands.set(commands.map(c => c.data.toJSON()));
                }
            },
            /**
             * @deprecated This method will be removed in v0.0.5
             * Use slashCommand.listen()
            */
            listenCommands: async (commands, onErrorMessage = "An error occurred while executing this command. Please try again later.") => {
                const res = new Response({ commands, onErrorMessage });
                __classPrivateFieldGet(this, _Application_client, "f").on("interactionCreate", async (interaction) => {
                    if (interaction.isChatInputCommand()) {
                        const cmd = commands.find(c => c.data.name === interaction.commandName);
                        if (!cmd)
                            return;
                        try {
                            await cmd.execute(interaction);
                            return interaction;
                        }
                        catch (err) {
                            await interaction.reply(onErrorMessage);
                            console.error(res.error({ "message": "Failed to execute Slash Command.", "code": "sl_exe_err", "content": err }).result);
                        }
                    }
                });
            },
            listen: async (data, callback) => {
                const all = [
                    ...__classPrivateFieldGet(this, _Application_globalSlash, "f").values(),
                    ...__classPrivateFieldGet(this, _Application_guildSlash, "f").values()
                ];
                const res = new Response({ commands: all, onErrorMessage: data.onError });
                __classPrivateFieldGet(this, _Application_client, "f").on("interactionCreate", async (interaction) => {
                    if (!interaction.isChatInputCommand())
                        return;
                    const cmd = all.find(c => c.data.name === interaction.commandName);
                    if (!cmd)
                        return;
                    try {
                        await cmd.execute(interaction);
                        if (callback) {
                            try {
                                await callback(interaction);
                            }
                            catch (err) {
                                console.error(res.error({ "message": "Failed to execute Callback", "code": "callback_err", "content": err }).result);
                            }
                        }
                    }
                    catch (err) {
                        if (data.onError?.callback) {
                            return data.onError.callback(interaction, err);
                        }
                        const payload = {
                            content: data.onError?.message ?? "An error occurred while executing this command. Please try again later.",
                            flags: data.onError?.flags
                        };
                        if (interaction.replied || interaction.deferred) {
                            await interaction.followUp(payload);
                        }
                        else {
                            await interaction.reply(payload);
                        }
                        console.error(res.error({ "message": "Failed to execute Slash Command.", "code": "sl_exe_err", "content": err }).result);
                    }
                });
            }
        };
        this.events = {
            /**
              * Listens to a list of events and executes their corresponding actions.
              *
              * @param {EventType[]} events - Array of event objects. Each event should contain:
              *   - `data`: information related to the event
              *   - `execute`: function that will be called when the event occurs
              *
              * @returns {Promise<void>} Returns a Promise that resolves when all events are being listened to.
              */
            listenEvents: async (events) => {
                for (const event of events) {
                    __classPrivateFieldGet(this, _Application_client, "f").on(event.data, (...args) => {
                        const message = args[0];
                        if (message && "author" in message && message.author?.bot)
                            return;
                        event.execute(...args);
                    });
                }
            }
        };
        __classPrivateFieldSet(this, _Application_client, settings.client, "f");
        __classPrivateFieldSet(this, _Application_token, settings.token, "f");
    }
    /**
     * @deprecated Use .client instead.
     */
    get getClient() {
        if (__classPrivateFieldGet(this, _Application_client, "f") == null) {
            throw new Error(`The client is not defined.`);
        }
        else {
            return __classPrivateFieldGet(this, _Application_client, "f");
        }
    }
    get client() {
        if (__classPrivateFieldGet(this, _Application_client, "f") == null) {
            throw new Error(`The client is not defined.`);
        }
        else {
            return __classPrivateFieldGet(this, _Application_client, "f");
        }
    }
    get user() {
        if (__classPrivateFieldGet(this, _Application_client, "f").user == null) {
            throw new Error('The client is not logged in. User is null.');
        }
        else {
            return __classPrivateFieldGet(this, _Application_client, "f").user;
        }
    }
    async connect() {
        if (!__classPrivateFieldGet(this, _Application_token, "f")) {
            throw new Error("Token is not defined.");
        }
        await __classPrivateFieldGet(this, _Application_client, "f").login(__classPrivateFieldGet(this, _Application_token, "f"));
    }
}
_Application_client = new WeakMap(), _Application_token = new WeakMap(), _Application_globalSlash = new WeakMap(), _Application_guildSlash = new WeakMap();
