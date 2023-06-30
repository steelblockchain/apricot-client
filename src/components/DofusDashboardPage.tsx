import { useState } from "react";
import DofusMessageHandler from "./DofusMessageHandler";
import DashboardAccordion from "./DashboardAccordion";

export type DofusDashboardPageParams = {
    pid: number;
};

export default function DofusDashboardPage({ pid }: DofusDashboardPageParams) {
    const [title, setTitle] = useState("Dofus");
    const [version, setVersion] = useState("");
    const [gamefd, setGamefd] = useState(-1);
    return (
        <DofusMessageHandler
            pid={pid}
            handlers={{
                /* Custom message handler */
                ProtocolRequired: (
                    infos /* Infos about the client fd, pid, target_address, host_port */,
                    from /* client or server */,
                    data /* message data ex: { __id__: 667, __name__: "ProtocolRequired", version: "1.0.0+bite" } */,
                    sender /* websocket sender client (communication through apricot client/server) */
                ) => {
                    setVersion(data.version);
                    setGamefd(infos.fd);
                },
                /* all message handler */
                all: (_, __, data, ___) => console.log(data),
                /* only client message handler */
                client: () => {},
                /* only server message handler */
                server: () => {},
                /* NOTE: IT IS USELESS TO ADD A CUSTOM MESSAGE HANDLER THROUGH client OR server OR all HANDLER */
                /* IF YOU WANT TO HANDLE A MESSAGE USE THE CUSTOM MESSAGE HANDLER LIKE THE EXAMPLE ABOVE */
            }}
        >
            <DashboardAccordion title={title} defaultOpen={true}>
                version {version}
            </DashboardAccordion>
        </DofusMessageHandler>
    );
}
