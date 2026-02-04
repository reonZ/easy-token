import { addListener, createFormData, getSetting, localize, R, render, setSetting } from "foundry-helpers";
import {
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "foundry-pf2e/foundry/client/applications/_module.mjs";

export class DirectoriesMenu extends foundry.applications.api.ApplicationV2 {
    #source: DirectorySource;

    constructor(options?: DeepPartial<ApplicationConfiguration>) {
        super(options);
        this.#source = getSetting("source");
    }

    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
        id: "easy-token-directories-menu",
        position: {
            width: 600,
        },
    };

    get title(): string {
        return localize("directories.title");
    }

    protected async _prepareContext(_options: ApplicationRenderOptions): Promise<MenuContext> {
        const source = this.#source;
        const paths = getSetting<PathsSetting>("paths");

        const sources: MenuContext["sources"] = R.map(["data", "s3"] as const, (type) => {
            return { value: type, label: type };
        });

        const entries: MenuEntry[] = R.map(
            Object.keys(game.system.documentTypes.Actor), //
            (type): MenuEntry => {
                return {
                    avatar: {
                        placeholder: getDefaultFilePath(type, source, "avatar"),
                        value: paths[type]?.avatar ?? "",
                    },
                    label: `TYPES.Actor.${type}`,
                    token: {
                        placeholder: getDefaultFilePath(type, source, "token"),
                        value: paths[type]?.token ?? "",
                    },
                    type,
                };
            },
        );

        return {
            entries,
            // @ts-ignore
            hasS3: game.data.files.storages.includes("s3"),
            source,
            sources,
        };
    }

    protected _renderHTML(context: ApplicationRenderContext, _options: ApplicationRenderOptions): Promise<string> {
        return render("directories", context);
    }

    protected _replaceHTML(result: string, content: HTMLElement, _options: ApplicationRenderOptions) {
        content.innerHTML = result;
        this.#activateListeners(content);
    }

    protected async _onClickAction(_event: PointerEvent, target: HTMLElement) {
        const action = target.dataset.action as "save" | "cancel";

        if (action === "cancel") {
            return this.close();
        }

        const { source, ...paths } = createFormData(this.element, true);

        await setSetting("source", source);
        await setSetting("paths", paths);

        this.close();
    }

    #activateListeners(html: HTMLElement) {
        addListener(html, `select[name="source"]`, "change", (el: HTMLSelectElement) => {
            this.#source = el.value as DirectorySource;
            this.render();
        });
    }
}

export function getDefaultFilePath(actorType: string, source: DirectorySource, category: PathCategory) {
    const path = `images/${category}s/${actorType}s`;
    return source === "s3" ? path : `worlds/${game.world.id}/${path}`;
}

export function getFilePath(actorType: string, source: DirectorySource, category: PathCategory): string {
    const paths = getSetting<PathsSetting>("paths");
    return (
        (foundry.utils.getProperty(paths, `${actorType}.${category}`) as string | undefined) ??
        getDefaultFilePath(actorType, source, category)
    );
}

type MenuContext = ApplicationRenderContext & {
    entries: MenuEntry[];
    hasS3: boolean;
    source: DirectorySource;
    sources: { value: DirectorySource; label: string }[];
};

type MenuEntry = Record<PathCategory, MenuEntryType> & {
    label: string;
    type: string;
};

type MenuEntryType = {
    placeholder: string;
    value: string;
};

export type PathCategory = "token" | "avatar";
export type DirectorySource = "data" | "s3";

export type PathsSetting = Record<string, { avatar?: string; token?: string } | undefined>;
