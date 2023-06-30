import { Sender } from "../contexts/WebClientContext";
import { create_key } from "./key";

export type mitm_handler_params = {
    pid: number;
    onConnect?: (data: Record<string, any>, sender: Sender) => void;
    onRecv?: (data: Record<string, any>, sender: Sender) => void;
    onSend?: (data: Record<string, any>, sender: Sender) => void;
};

export type dofus_handler_params = Omit<
    mitm_handler_params,
    "onConnect" | "onRecv" | "onSend"
> & {
    protocol: string;
};

export function dofus_mitm_handler(params: dofus_handler_params) {
    return mitm_handler({
        pid: params.pid,
        onConnect: (data, sender) => {
            if (params.protocol === "") {
                return;
            }
            sender({
                type: "execute",
                module: "dofus-module",
                action: "create_analyzer",
                params: {
                    key: create_key(data.payload[0]),
                    protocol: params?.protocol,
                },
            });
        },
        onRecv: (data, sender) => {
            if (params.protocol === "") {
                return;
            }
            sender({
                type: "execute",
                module: "dofus-module",
                action: "push_and_decode",
                params: {
                    key: create_key(data.payload[0]),
                    buffer: data.payload[1],
                    type: data.payload[0].type,
                },
            });
        },
        onSend: (data, sender) => {
            if (params.protocol === "") {
                return;
            }
            sender({
                type: "execute",
                module: "dofus-module",
                action: "push_and_decode",
                params: {
                    key: create_key(data.payload[0]),
                    buffer: data.payload[1],
                    type: data.payload[0].type,
                },
            });
        },
    });
}

export default function mitm_handler(params: mitm_handler_params) {
    return {
        "mitm:connect": (data: Record<string, any>, sender: Sender) => {
            if (data.payload[0].pid !== params.pid) {
                return;
            }
            params.onConnect?.(data, sender);
        },
        "mitm:recv": (data: Record<string, any>, sender: Sender) => {
            if (data.payload[0].pid !== params.pid) {
                return;
            }
            params.onRecv?.(data, sender);
        },
        "mitm:send": (data: Record<string, any>, sender: Sender) => {
            if (data.payload[0].pid !== params.pid) {
                return;
            }
            params.onSend?.(data, sender);
        },
    };
}
