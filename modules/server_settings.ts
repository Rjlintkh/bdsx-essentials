import { CustomForm } from "bdsx/bds/form";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ServerSettingsResponsePacket } from "bdsx/bds/packets";
import { events } from "bdsx/event";
import { Module } from "./base";

export class ServerSettings extends Module {
    name = "Server Settings";
    identifier = "server_settings";
    onLoad() {
        events.packetBefore(MinecraftPacketIds.ServerSettingsRequest).on((_, ni) => {
            const settings = this.getConfig()["modules"]["server_settings"]["settings"];
            const form = new CustomForm(settings.title, settings.content);
            (form.data as any).icon = settings.icon;
            const pk = ServerSettingsResponsePacket.create();
            pk.id = Math.floor(Math.random() * (0x7fffffff - 0x40000000 + 1)) + 0x40000000;
            pk.content = JSON.stringify(form.data);
            pk.sendTo(ni);
            pk.dispose();
        });
    }
}