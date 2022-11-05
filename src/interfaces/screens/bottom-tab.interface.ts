export interface ActionButtonBottomTab {
    toggleMenu(): void;
    openMenu: boolean;
}

export interface ActionMenuBottomTab {
    toggleMenu(): void;
    emitEvent(route: string): void;
    openMenu: boolean;
}