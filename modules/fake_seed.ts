import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import { Module } from "./base";

export class FakeSeed extends Module {
    name = "Fake Seed";
    identifier = "fake_seed";
    onLoad() {
        events.packetSend(MinecraftPacketIds.StartGame).on(pk => {
            pk.settings.seed = this.getConfig()["modules"]["fake_seed"]["fake_seed"];
        });
    }
}