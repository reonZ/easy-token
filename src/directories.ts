import { localize, render } from "foundry-helpers";
import {
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "foundry-pf2e/foundry/client/applications/_module.mjs";

export class DirectoriesMenu extends foundry.applications.api.ApplicationV2 {
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
        id: "easy-token-directories-menu",
    };

    get title(): string {
        return localize("directories.title");
    }

    protected _renderHTML(context: ApplicationRenderContext, options: ApplicationRenderOptions): Promise<string> {
        return render("directories", context);
    }

    protected _replaceHTML(result: string, content: HTMLElement, options: ApplicationRenderOptions) {
        content.innerHTML = result;
    }
}
