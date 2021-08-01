import { serverInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { Module } from "./base";

export class Motd extends Module {
    name = "Motd";
    identifier = "motd";
    onLoad() {
        let index = 0;
        let cache: string[] = [];
        function compare(a: any[], b: any[]) {
            return a.length == b.length && a.every((e,i) => e == b[i]);
        };
        setInterval(() => {
            const messages = this.getConfig()["modules"]["motd"]["messages"];
            if (messages.length === 0 || messages === null) return;
            if (!compare(cache, messages) || index >= messages.length) {
                index = 0;
                cache = messages;
            }
            if (this.getConfig()["modules"]["motd"]["shuffle"]) {
                serverInstance.setMotd(cache[Math.floor(Math.random() * cache.length)]);
            } else {
                serverInstance.setMotd(cache[index]);
            }
            index++;
        }, this.config["modules"]["motd"]["interval-ms"]);
        events.queryRegenerate.on(event => {
            const levelname = this.getConfig()["modules"]["motd"]["level_name"];
            if (levelname.length !== 0 || levelname !== null) {
                event.levelname = levelname;
            };
            event.isJoinableThroughServerScreen = !this.getConfig()["modules"]["motd"]["lock_server"];
        });
    }
}