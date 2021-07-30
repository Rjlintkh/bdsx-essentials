import { ServerPlayer } from "bdsx/bds/player";
import { CxxString, int32_t } from "bdsx/nativetype";
import { Module } from "./base";

export class TransferServer extends Module {
    name = "Transfer Server";
    identifier = "transfer_server";
    onLoad() {
        this.command.overload((params, origin, output) => {
            const player = origin.getEntity() as ServerPlayer;
            if (player) {
                if (0 > params.port || params.port > 65536) {
                    this.setCommandOutput(output, "commands.transferserver.invalid.port", [], true);
                } else {
                    player.transferServer(params.server, params.port);
                    this.setCommandOutput(output, "commands.transferserver.successful", []);
                }
            } else {
                this.setCommandOutput(output, "commands.generic.noTargetMatch", [], true);
            }
        }, { server: CxxString, port: int32_t});
    }
}