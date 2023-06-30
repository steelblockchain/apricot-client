import { createContext } from "react";

export type AppStateDashboardConfigurationType = "none" | "dofus" | undefined;

export type AppStateDashboard = {
    configurationtype: AppStateDashboardConfigurationType;
    configurationparams?: Record<string, any>;
};

export type AppStateContextType = {
    [pid: number]: AppStateDashboard;
};

export const AppStateContext = createContext<AppStateContextType>({});
