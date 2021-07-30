import { asm, Register } from "bdsx/assembler";
import { hacker } from "../proc";
import { Module } from "./base";

export class ForceWorldSettings extends Module {
    name = "Force World Settings";
    identifier = "force_world_settings";
    onInit() {
        hacker.write("?isExperimentEnabled@Experiments@@QEBA_NW4AllExperiments@@@Z", 0, asm().mov_r_c(Register.rax, 1).ret());
        hacker.write("?Gametest@Experiments@@QEBA_NXZ", 0, asm().mov_r_c(Register.rax, 1).ret());
        hacker.write("?isAnyToggleEnabled@ExperimentStorage@@QEBA_NXZ", 0, asm().mov_r_c(Register.rax, 1).ret());
        hacker.write("?wereAnyExperimentsEverToggled@ExperimentStorage@@QEBA_NXZ", 0, asm().mov_r_c(Register.rax, 1).ret());
        hacker.write("?isEducationEditionLevel@LevelData@@QEBA_NXZ", 0, asm().mov_r_c(Register.rax, Number(this.config.modules.force_world_settings.edu_mode)).ret());
        this.getLevel().setCommandsEnabled(this.config.modules.force_world_settings.cheats);
    }
    onLoad() {
        hacker.write("?isEducationEditionLevel@LevelData@@QEBA_NXZ", 0, asm().mov_r_c(Register.rax, 0).ret());
    }
}