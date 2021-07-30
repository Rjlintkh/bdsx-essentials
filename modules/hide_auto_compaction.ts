import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { Module } from "./base";

export class HideAutoCompaction extends Module {
    name = "Hide Auto Compaction";
    identifier = "hide_auto_compaction";
    onLoad() {
        events.serverLog.on(log => {
            if (log.match(/\[INFO\] Running AutoCompaction.../)) {
                return CANCEL;
            }
        });
    }
}