import { ReactNode, useEffect, useState } from "react";
import {
    WebClientContext,
    WebClientContextType,
} from "../contexts/WebClientContext";

export type WebClientProviderParams = {
    children: ReactNode;
    ip: string;
};

export default function WebClientProvider(params: WebClientProviderParams) {
    const [websocket, setWebsocket] = useState<WebClientContextType>(undefined);

    useEffect(() => {
        const ws = new WebSocket(params.ip);
        ws.addEventListener("open", () => {
            setWebsocket(ws);
        });

        ws.addEventListener("close", () => {
            setWebsocket(undefined);
        });

        return () => {
            ws.close();
        };
    }, [setWebsocket]);

    return (
        <WebClientContext.Provider value={websocket}>
            {params.children}
        </WebClientContext.Provider>
    );
}
