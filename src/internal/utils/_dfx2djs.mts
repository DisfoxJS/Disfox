import { SlashOptions, SlashTag } from "../../public/index.js";
import { Command } from "../../public/structures/slashServiceCommand.js";
import { DisfoxErrorCode } from "../../public/errors/_disfox.errorCode.js";
import { DisfoxError } from "../../public/errors/_disfoxerror.js";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export function dfx2djsC(command : Command) {
    
    if (!(command instanceof Command))  {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `InvalidArgumentError: Expected an instance of Command. Received: ${command}`,
            "source": {"body": {
                method: `SlashService.getDFXFile`
            }},
        })
    }

    const data = command.cdata()

    let result : {
        data: any,
        execute: any
    } = {
        data: null,
        execute: null
    } 
         
    const DJSCommand = new SlashCommandBuilder()
        .setName(data.name)
        
    if (typeof data.description  !== "string") {
        throw new DisfoxError({
             "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command description must be of type string. Received value: ${data.description}`,
            "source": {"body": `SlashService.getDFXFile`},
        })
    };

    if (typeof data.action !== "function") {
        throw new DisfoxError({
            "code": DisfoxErrorCode.INVALID_TYPE,
            "message": `Command action must be of type function. Received value: ${data.action}`,
            "source": {"body": `SlashService.getDFXFile`},
        })
    };

    if (Array.isArray(data.options) && data.options.length > 0) {
        for (const option of data.options) {
            const data = option.data

            if (typeof data.inputDescription  !== "string") {
                throw new DisfoxError({
                    "code": DisfoxErrorCode.INVALID_TYPE,
                    "message": `Command description must be of type string. Received value: ${data.inputDescription}`,
                    "source": {"body": `SlashService.getDFXFile`},
                })
            };

            if (data.inputType === SlashOptions.String) {
                DJSCommand.addStringOption(op => {
                    op.setName(data.name)
                    op.setDescription(data.inputDescription as string)
                    op.setRequired(data.isRequired)
                    return op;
                })
            };

            if (data.inputType === SlashOptions.Number) {
                DJSCommand.addNumberOption(op => {
                    if (typeof data.settings.minNumber === `number`) op.setMinValue(data.settings.minNumber);
                    if (typeof data.settings.maxNumber === `number`) op.setMaxValue(data.settings.maxNumber);

                    op.setName(data.name)
                    op.setDescription(data.inputDescription as string)
                    return op;
                })
            };

            if (data.inputType == SlashOptions.Mentionable) {
                DJSCommand.addMentionableOption(input => {
                    input.setName(data.name).setDescription(data.inputDescription as string)
                    input.setRequired(data.isRequired)
                    return input;
                })
            };

            if (data.inputType == SlashOptions.Boolean) {
                DJSCommand.addBooleanOption(input => {
                    input.setName(data.name).setDescription(data.inputDescription as string)
                    input.setRequired(data.isRequired)
                    return input;
                })
            }

            if (data.inputType == SlashOptions.Role) {
                DJSCommand.addRoleOption(input => {
                    input.setName(data.name).setDescription(data.inputDescription as string)
                    input.setRequired(data.isRequired)
                    return input;
                })
            }

            if (data.inputType == SlashOptions.Attachment) {
                DJSCommand.addAttachmentOption(input => {
                    input.setName(data.name).setDescription(data.inputDescription as string)
                    input.setRequired(data.isRequired)
                    
                    return input;
                })
            }
        }

    };

    if (data.tags.length > 0) {
        for (const tag of data.tags) {
            switch (tag) {
                case SlashTag.NSFW:
                    DJSCommand.setNSFW(true);
                    break;
                case SlashTag.AdminOnly:
                    DJSCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                    break;
            }
        }
    }

    DJSCommand.setDescription(data.description);
    result.data = DJSCommand;
    result.execute = data.action;
    return result;
}