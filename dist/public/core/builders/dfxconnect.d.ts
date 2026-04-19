import { Application } from "../../../index.js";
export interface DfxConfig {
    key: string;
    application: Application;
}
export declare class DfxServer {
    connect(config: DfxConfig): Promise<void>;
}
//# sourceMappingURL=dfxconnect.d.ts.map