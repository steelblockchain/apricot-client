import { FormHTMLAttributes, FormEvent, useCallback, useContext } from "react";
import { Sender, WebClientContext } from "../contexts/WebClientContext";

export type WebClientFormParams = {
    onClientSubmit?: (
        event: FormEvent<HTMLFormElement>,
        client: Sender
    ) => void;
} & FormHTMLAttributes<HTMLFormElement>;

export default function WebClientForm(params: WebClientFormParams) {
    const websocket = useContext(WebClientContext);
    const { onSubmit, onClientSubmit, ...rest } = params;

    const clientSend = (data: Record<string, any>) => {
        websocket?.send(JSON.stringify(data));
    };

    const wrappedOnSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            onSubmit?.(event);

            onClientSubmit?.(event, clientSend);
        },
        [websocket]
    );

    return <form {...rest} onSubmit={wrappedOnSubmit}></form>;
}
