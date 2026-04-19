import { SlashCommandAttachmentOption, SlashCommandBooleanOption, SlashCommandChannelOption, SlashCommandMentionableOption, SlashCommandNumberOption, SlashCommandRoleOption, SlashCommandStringOption } from "discord.js";
export const SlashOptions = {
    String: SlashCommandStringOption,
    Number: SlashCommandNumberOption,
    Channel: SlashCommandChannelOption,
    Boolean: SlashCommandBooleanOption,
    Role: SlashCommandRoleOption,
    Attachment: SlashCommandAttachmentOption,
    Mentionable: SlashCommandMentionableOption
};
