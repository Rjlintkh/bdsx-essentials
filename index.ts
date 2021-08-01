import { AllowUserResourcePack } from "./modules/allow_user_resource_pack";
import { FakeSeed } from "./modules/fake_seed";
import { ForceWorldSettings } from "./modules/force_world_settings";
import { HideAutoCompaction } from "./modules/hide_auto_compaction";
import { Motd } from "./modules/motd";
import { Nick } from "./modules/nick";
import { Seed } from "./modules/seed";
import { TransferServer } from "./modules/transfer_server";

console.log(`  _
|_  _  _  _  ._ _|_ o  _. |  _
|_ _> _> (/_ | | |_ | (_| | _>
    `.cyan);

new AllowUserResourcePack()._();
new FakeSeed()._();
new ForceWorldSettings()._();
new HideAutoCompaction()._();
new Motd()._();
new Nick()._();
new Seed()._();
new TransferServer()._();