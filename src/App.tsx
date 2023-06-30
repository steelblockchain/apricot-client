import { useCallback, useContext, useState } from "react";
import TabManager, { TabManagerTab } from "./components/TabManager";
import CreationPage from "./components/CreationPage";
import WebClientHandler from "./components/WebClientHandler";
import DashboardPage from "./components/DashboardPage";
import { AppStateContext } from "./contexts/AppStateContext";

export default function App() {
    const [tabs, setTabs] = useState<Record<number, TabManagerTab>>({});
    const appState = useContext(AppStateContext);

    const closeTab = useCallback(
        (pid: number) => {
            setTabs((t) => {
                const new_t = { ...t };
                delete new_t[pid];
                return new_t;
            });
        },
        [setTabs]
    );

    return (
        <>
            <TabManager
                tabs={Object.values(tabs)}
                defaultTab={{
                    params: { label: "+" },
                    content: (
                        <WebClientHandler
                            handlers={{
                                "mitm:create": (data) => {
                                    const len = Object.keys(tabs).length;
                                    if (len > 20) {
                                        return;
                                    }
                                    const pid = data.payload[0];
                                    setTabs((t) => {
                                        if (t[pid]) {
                                            return t;
                                        }
                                        appState[pid] = {
                                            configurationtype: undefined,
                                        };

                                        return {
                                            ...t,
                                            [pid]: {
                                                params: {
                                                    label: `${pid}` ?? "?",
                                                },
                                                content: (
                                                    <DashboardPage
                                                        pid={pid}
                                                        onClose={closeTab}
                                                    />
                                                ),
                                            },
                                        };
                                    });
                                },
                            }}
                        >
                            <CreationPage />
                        </WebClientHandler>
                    ),
                }}
            />
        </>
    );
}
