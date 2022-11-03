export type ActionButtonBottomTab = {
    toggleMenu(): void;
    openMenu: boolean;
}

export type ActionMenuBottomTab = {
    toggleMenu(): void;
    emitEvent(route: string): void;
    openMenu: boolean;
}