export class AppConfig {
    #configs: Record<string, any >

    constructor() {
        this.#configs = {}
    }   

    public set(settingName: string, value: any): boolean {
        this.#configs[settingName] = value
        return true
    }

    public get(settingName: string): any {
        if (!this.#configs.hasOwnProperty(settingName)) {
            throw new Error(`Setting "${settingName}" does not exist.`)
        }

        return this.#configs[settingName]
    }

    public remove(settingName: string): boolean {
       if (!this.#configs.hasOwnProperty(settingName)) {
            throw new Error(`Setting "${settingName}" does not exist.`)
        }

        delete this.#configs[settingName]
        return true
    }
}