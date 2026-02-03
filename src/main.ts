import { TokenEditor } from "editor";
import { localize, MODULE } from "foundry-helpers";
import { ApplicationHeaderControlsEntry } from "foundry-pf2e/foundry/client/applications/_types.mjs";
import { ApplicationV1HeaderButton } from "foundry-pf2e/foundry/client/appv1/api/_module.mjs";
import ActorSheet from "foundry-pf2e/foundry/client/appv1/sheets/actor-sheet.mjs";

MODULE.register("easy-token");

Hooks.on("getActorSheetHeaderButtons", (sheet: ActorSheet<Actor>, buttons: ApplicationV1HeaderButton[]) => {
    if (!game.user.can("FILES_UPLOAD")) return;

    buttons.unshift({
        class: "easy-token",
        icon: "fas fa-image",
        label: localize("label"),
        onclick: () => {
            TokenEditor.open(sheet.actor);
        },
    });
});

Hooks.on("getHeaderControlsActorSheetV2", (sheet: ActorSheet<Actor>, buttons: ApplicationHeaderControlsEntry[]) => {
    buttons.unshift({
        action: "easy-token",
        icon: "fas fa-image",
        label: localize("label"),
        visible: game.user.can("FILES_UPLOAD"),
        onClick: () => {
            TokenEditor.open(sheet.actor);
        },
    });
});
