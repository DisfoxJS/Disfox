type interactionType = 'channel' | 'slash';
export declare class InteractionPermission {
    #private;
    constructor(config: {
        type: interactionType;
    });
    setAllowed(...allowed: string[]): this;
    setRestricted(...restricted: string[]): this;
    onViolate(callback: () => any): void;
    toObject(): {
        allowed: string[];
        restricted: string[];
        interactionType: interactionType;
        onViolate: () => any;
    };
}
export {};
//# sourceMappingURL=interactionPermissions.d.ts.map