import { ReactNode, useCallback, useContext, useEffect } from "react";
import { Sender, WebClientContext } from "../contexts/WebClientContext";

export type WebClientHandlerParams = {
    children?: ReactNode;
    handlers?: Record<
        string,
        (data: Record<string, any>, sender: Sender) => void
    >;
};

export default function WebClientHandler(params: WebClientHandlerParams) {
    const websocket = useContext(WebClientContext);

    const clientSend = (data: Record<string, any>) => {
        websocket?.send(JSON.stringify(data));
    };

    const handleMessage = useCallback(
        (event: MessageEvent<any>) => {
            const data = JSON.parse(event.data);
            params.handlers?.[data.type]?.(data, clientSend);
        },
        [websocket]
    );

    useEffect(() => {
        websocket?.addEventListener("message", handleMessage);

        return () => {
            websocket?.removeEventListener("message", handleMessage);
        };
    }, [websocket]);

    return <>{params.children}</>;
}
