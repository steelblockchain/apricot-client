import { ReactNode } from "react";
import WebClientHandler from "./WebClientHandler";
import { Sender } from "../contexts/WebClientContext";

export type DofusMessageHandlerParams = {
    pid: number;
    children?: ReactNode;
    handlers: Record<
        string | "client" | "server" | "all",
        (
            infos: Record<string, any>,
            from: "client" | "server",
            data: Record<string, any>,
            sender: Sender
        ) => void
    >;
};

export default function DofusMessageHandler({
    pid,
    children,
    handlers,
}: DofusMessageHandlerParams) {
    return (
        <WebClientHandler
            handlers={{
                "dofus:message": (data, sender) => {
                    const key = data.payload[0];
                    const from = data.payload[1];
                    const message = data.payload[2];

                    const key_infos = JSON.parse(key);

                    if (key_infos.pid === pid) {
                        handlers[message.__name__]?.(
                            key_infos,
                            from,
                            message,
                            sender
                        );
                        handlers[from]?.(key_infos, from, message, sender);
                        handlers["all"]?.(key_infos, from, message, sender);
                    }
                },
            }}
        >
            {children}
        </WebClientHandler>
    );
}
