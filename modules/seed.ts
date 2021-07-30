import { Module } from "./base";

export class Seed extends Module {
    name = "Seed";
    identifier = "seed";
    onLoad() {
        this.command.overload((params, origin, output) => {
            this.setCommandOutput(output, "commands.seed.success", [this.symcall["?getSeed@Level@@UEAAIXZ"](this.getLevel()).toString()]);
        }, {});
    }
}