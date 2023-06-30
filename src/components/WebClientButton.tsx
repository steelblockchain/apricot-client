import {
    ButtonHTMLAttributes,
    MouseEvent,
    useCallback,
    useContext,
} from "react";
import { Sender, WebClientContext } from "../contexts/WebClientContext";

export type WebClientButtonParams = {
    onClientClick?: (
        event: MouseEvent<HTMLButtonElement>,
        client: Sender
    ) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function WebClientButton(params: WebClientButtonParams) {
    const websocket = useContext(WebClientContext);
    const { onClick, onClientClick, ...rest } = params;

    const clientSend = (data: Record<string, any>) => {
        websocket?.send(JSON.stringify(data));
    };

    const wrappedOnClick = useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
            onClick?.(event);

            onClientClick?.(event, clientSend);
        },
        [websocket]
    );

    return <button {...rest} onClick={wrappedOnClick}></button>;
}
