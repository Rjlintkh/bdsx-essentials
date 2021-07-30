import { CommandOutput } from "bdsx/bds/command";
import { Level } from "bdsx/bds/level";
import { CxxVector } from "bdsx/cxxvector";
import { nativeClass, NativeClass, nativeField } from "bdsx/nativeclass";
import { CxxString, int32_t, uint32_t, void_t } from "bdsx/nativetype";
import { ProcHacker } from "bdsx/prochacker";

@nativeClass(0x28)
export class CommandOutputParameter extends NativeClass {
    @nativeField(CxxString)
    string: CxxString;
    @nativeField(int32_t)
    count: int32_t;
}

export const symbols = [
    "?getSeed@Level@@UEAAIXZ",
    "?isEducationEditionLevel@LevelData@@QEBA_NXZ",
    "?success@CommandOutput@@QEAAXXZ",
    "?addMessage@CommandOutput@@AEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@W4CommandOutputMessageType@@@Z",
    "?isAnyToggleEnabled@ExperimentStorage@@QEBA_NXZ",
    "?isExperimentEnabled@Experiments@@QEBA_NW4AllExperiments@@@Z",
    "?wereAnyExperimentsEverToggled@ExperimentStorage@@QEBA_NXZ",
    "?Gametest@Experiments@@QEBA_NXZ",
] as const;

export const hacker = ProcHacker.load("pdb.ini", symbols);

export const proc = {
    "?getSeed@Level@@UEAAIXZ": hacker.js("?getSeed@Level@@UEAAIXZ", uint32_t, null, Level),
    "?success@CommandOutput@@QEAAXXZ": hacker.js("?success@CommandOutput@@QEAAXXZ", void_t, null, CommandOutput),
    "?addMessage@CommandOutput@@AEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@W4CommandOutputMessageType@@@Z": hacker.js("?addMessage@CommandOutput@@AEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@W4CommandOutputMessageType@@@Z", void_t, null, CommandOutput, CxxString, CxxVector.make(CommandOutputParameter), int32_t),
};