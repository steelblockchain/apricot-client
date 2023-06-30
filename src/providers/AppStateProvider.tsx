import { ReactNode, useState } from "react";
import { AppStateContext } from "../contexts/AppStateContext";
import { proxy } from "valtio";

export type AppStateProviderParams = {
    children: ReactNode;
};

export default function AppStateProvider({ children }: AppStateProviderParams) {
    const [appState] = useState(proxy({}));

    return (
        <AppStateContext.Provider value={appState}>
            {children}
        </AppStateContext.Provider>
    );
}
