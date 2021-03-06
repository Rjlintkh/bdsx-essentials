import { ActorWildcardCommandSelector } from "bdsx/bds/command";
import { ServerPlayer } from "bdsx/bds/player";
import { CxxString } from "bdsx/nativetype";
import { Module } from "./base";

export class Nick extends Module {
    name = "Nick";
    identifier = "nick";
    onLoad() {
        this.command.overload((params, origin, output) => {
            const player = origin.getEntity() as ServerPlayer;
            const targets = params.target.newResults(origin);
            if (targets.length === 0) {
                this.setCommandOutput(output, "commands.generic.noTargetMatch", [], true);
            } else if (targets.length > 1) {
                this.setCommandOutput(output, "commands.generic.tooManyTargets", [], true);
            } else {
                if (targets[0].isPlayer()) {
                    targets[0].setName(params.name);
                    this.setCommandOutput(output, "chat.renamed", [params.name]);
                } else {
                    this.setCommandOutput(output, "commands.generic.targetNotPlayer", [], true);
                }
            }
        }, { target: ActorWildcardCommandSelector, name: CxxString });
    }
}