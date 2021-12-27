import { IStreamConfig } from "./IStreamConfig";
import { ISettingsConfig } from "./ISettingsConfig";
export default interface IStormConfig {
    role: string;
    connection: string;
    stream: IStreamConfig;
    settings: ISettingsConfig;
}
