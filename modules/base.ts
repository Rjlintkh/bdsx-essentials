import { CommandOutput } from "bdsx/bds/command";
import { Level } from "bdsx/bds/level";
import { serverInstance } from "bdsx/bds/server";
import { command } from "bdsx/command";
import { CxxVector } from "bdsx/cxxvector";
import { events } from "bdsx/event";
import { CommandOutputParameter, proc } from "../proc";
import config = require("../config.json");
import fs = require("fs");
import path = require("path");

export class Module {
    /** Display name of the module */
    name: string;
    /** Identifier of the module */
    identifier: string;
    /** Config of the module */
    config = config;
    /** Actively get config of the module */
    getConfig(): typeof config {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json"), "utf8"));
    }
    /** Returns the world of the server */
    getLevel(): Level {
        return serverInstance.minecraft.getLevel();
    }
    /** Override to set callback after server loads */
    onLoad() {};
    /** Override to set callback after server closes */
    onExit() {};
    /** Override to set callback before server loads */
    onInit() {};

    _() {
        if ((this.config as any)["modules"][this.identifier]["enabled"]) {
            if (this.config.show_loading_message) {
                console.info("[Essentials]".cyan, `Module '${this.name.green}' is being loaded.`);
            }
            events.serverOpen.on(() => {
                this.onLoad();
                if (this.config.show_loading_message) {
                    console.info("[Essentials]".cyan, `Module '${this.name.green}' has been loaded.`);
                }
            });
            events.serverClose.on(() => {
                this.onExit();
            });
        }
    }

    get command() {
        return command.register((this.config as any)["modules"][this.identifier]["command"]["command"], this.translate(`module.${this.identifier}.command.desc`) ?? `commands.${this.identifier}.description`, (this.config as any)["modules"][this.identifier]["command"]["permission"]);
    }

    translate(text: string) {
        return (this.config as any)["lang"][text];
    }

    setCommandOutput(output: CommandOutput, message: string, params: string[] = [], error: boolean = false) {
        const outputParams = (CxxVector.make(CommandOutputParameter)).construct();
        for (const param of params) {
            const outputParam = CommandOutputParameter.construct();
            outputParam.string = param;
            outputParam.count = 1;
            outputParams.push(outputParam);
            outputParam.destruct();
        }
        this.symcall["?addMessage@CommandOutput@@AEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@W4CommandOutputMessageType@@@Z"](output, message, outputParams, Number(error));
        outputParams.destruct();
    }

    get symcall() {
        return proc;
    }
}