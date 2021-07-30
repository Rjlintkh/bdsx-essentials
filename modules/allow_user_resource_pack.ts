import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import { Module } from "./base";

export class AllowUserResourcePack extends Module {
    name = "Allow User Resource Pack";
    identifier = "allow_user_resource_pack";
    onLoad() {
        events.packetSend(MinecraftPacketIds.ResourcePacksInfo).on(pk => {
            pk.setBoolean(true, 0x30);
        });
    }
}